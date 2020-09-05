import { TokenType } from "./auth/[...nextauth]";
import jwt from "next-auth/jwt";
import { ID } from "./../../apolloclient/types";
import { getSession } from "next-auth/client";
import { NextApiRequest } from "next";
import { NextApiResponse } from "next";

const { GOOGLE_SECRET } = process.env;

class DataApi {
  req: NextApiRequest;
  res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    [this.req, this.res] = [req, res];
  }

  private GetToken = async (): Promise<TokenType> =>
    await jwt.getToken({ req: this.req, secret: GOOGLE_SECRET });

  private TokenRespone = async () =>
    await this.res.status(401).send({
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
    if (token?.id) return token?.id;
    await this.TokenRespone();
    return null;
  }

  True = <T>(data: T | string) =>
    this.res.status(201).send({ success: true, data });

  Wrong(condition: boolean, mes: string = "Data wrong") {
    if (!condition) return false;
    this.res.status(400).send({ success: true, data: mes });
    return true;
  }

  Error = (error, mes: string = "Error request") =>
    this.res.status(422).send({ success: false, data: { error, mes } });

  Default = () =>
    this.res.status(400).json({ success: false, data: "Method wrong" });
}

export default DataApi;
