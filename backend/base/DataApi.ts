import jwt from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'
import { ID } from '@chat/apollocommon'
import { TokenType } from 'pages/api/auth/[...nextauth]'

const { JWT_SECRET } = process.env;
console.log(JWT_SECRET)

enum Error {
  True = 201,
  ProblemsAutorization = 401,
  Request = 422,
  DataWrong = 400,
}

class DataApi {
  req: NextApiRequest;
  res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    [this.req, this.res] = [req, res];
  }

  private GetToken = async (): Promise<TokenType> =>
    (await jwt.getToken({ req: this.req, secret: JWT_SECRET })) as TokenType;

  private TokenRespone = async () =>
    await this.res.
      status(Error.ProblemsAutorization).
      send({
        success: true,
        data: "You have problems on the autorization",
      });

  async TrustUser(): Promise<TokenType> {
    const token = await this.GetToken();
    if (token) return token;
    await this.TokenRespone();
    return null;
  }

  async TrustUserID(): Promise<ID> {
    const token = await this.GetToken();
    if (token?.id) return token.id;
    await this.TokenRespone();
    return null;
  }

  True = <T>(data: T | string) =>
    this.res.
      status(Error.True).
      send({ success: true, data });

  //if true => return; else continue
  Wrong(condition: boolean, mes: string = "Data wrong") {
    if (!condition) return false;

    this.res.
      status(Error.DataWrong).
      send({ success: true, data: mes });

    return true;
  }

  //if null => return; else continue
  async WrongTrust(
    condition: boolean,
    mes: string = "Data wrong"
  ): Promise<TokenType> {
    if (this.Wrong(condition, mes)) return null;

    const token = await this.TrustUser();
    if (!token) return null;

    return token;
  }

  //if null => return; else continue
  WrongTrustUserID = async (
    condition: boolean,
    mes: string = "Data wrong"
  ): Promise<ID> =>
    this.Wrong(condition, mes) ?
      null :
      await this.TrustUserID();

  Error = (error, mes: string = "Error request") =>
    this.res
      .status(Error.Request)
      .send({ success: false, data: { error, mes } });

  Default = () =>
    this.res
      .status(Error.DataWrong)
      .json({ success: false, data: "Method wrong" });
}

export default DataApi;
