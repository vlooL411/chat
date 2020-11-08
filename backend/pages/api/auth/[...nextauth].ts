import Providers from 'next-auth/providers'
import NextAuth, { InitOptions } from 'next-auth'
import { ID } from '@chat/apollocommon'
import { NextApiRequest, NextApiResponse } from 'next'
import { QueryUserIdArgs, User } from '@generated/backend'

const { DB_HOST } = process.env;
const { HOST_GRAPHQL } = process.env;

const { SIGN_OUT } = process.env;
const { SIGN_ERROR } = process.env;

const { JWT_SECRET } = process.env;
const { GOOGLE_ID } = process.env;
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
      const data = (await json.json().
        then((el) => el?.data)) as {
          UserID: User;
        };
      if (data) token.id = data?.UserID?._id;

      return await token;
    },
  },
  pages: {
    signOut: SIGN_OUT,
    error: SIGN_ERROR,
  },
  jwt: {
    secret: JWT_SECRET,
  },
  session: {
    jwt: true,
  },

  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
  ],

  database: DB_HOST
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
