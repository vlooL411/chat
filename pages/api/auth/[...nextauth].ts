import Providers from 'next-auth/providers'
import NextAuth, { InitOptions } from 'next-auth'
import { ID } from '@types'
import { NextApiRequest, NextApiResponse } from 'next'
import { QueryUserIdArgs, User } from '@frontend'

const { DB_HOST } = process.env;
const { GOOGLE_SECRET } = process.env;

export type TokenType = {
  id: ID;
  name: string;
  email: string;
};

const getUserID = `
  query userID($name: String!, $email: String!) {
    UserID(name: $name, email: $email) {
      _id
    }
  }
`;

const { HOST_GRAPHQL } = process.env;

const options: InitOptions = {
  callbacks: {
    jwt: async (token) => {
      const { name, email } = token;

      const json = await fetch(HOST_GRAPHQL, {
        method: "POST",
        body: JSON.stringify({
          query: getUserID,
          variables: { name, email } as QueryUserIdArgs,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = (await json.json().then((el) => el?.data)) as {
        UserID: User;
      };
      if (data) token.id = data?.UserID?._id;

      return await token;
    },
  },
  pages: {
    signOut: "/",
    error: "/",
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
