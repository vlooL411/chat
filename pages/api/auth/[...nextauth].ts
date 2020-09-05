import { ID } from "./../../../apolloclient/types";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import MessangerMongoDB from "../../../base/MessangerMongoDB";

const { DB_HOST } = process.env;
const { GOOGLE_SECRET } = process.env;

export type TokenType = {
  id: ID;
  name: string;
  email: string;
};

class StorageID {
  static ID;
  static lastEmail;
  static lastName;
}

const options: InitOptions = {
  callbacks: {
    jwt: async (token) => {
      token.id = StorageID.ID;
      const { id, name, email } = token;
      const { lastEmail, lastName } = StorageID;

      if ((!id && name && email) || (lastEmail != email && lastName != name)) {
        const data = await new MessangerMongoDB().UserID(name, email);
        StorageID.ID = token.id = data?._id;
        [StorageID.lastEmail, StorageID.lastName] = [email, name];
      }

      return await token;
    },
  },
  pages: {
    signOut: "/",
    error: "/#?error=Invalid_data",
  },
  jwt: {
    secret: GOOGLE_SECRET,
  },
  session: {
    jwt: true,
  },

  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  database: DB_HOST,
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
