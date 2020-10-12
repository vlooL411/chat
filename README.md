This is a [Next.js](https://nextjs.org) project, within using:

- TypeScript
- MongoDB
- Apollo Client (React)
- Apollo Server
- GraphQL Code Generator
- SASS
- NextAuth.js
- Jest

## Getting Started

First, define .env by the template .env.template:

1. DB_NAME - name collection mongodb
2. DB_LOGIN - login to mongo
3. DB_PASSWORD - password to mongo

For autentification using google account, also

4. GOOGLE_ID - more details [Create authorization credentials](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow)
5. GOOGLE_SECRET - point 4

also:

- PORT if chage, need in the package.json add next dev|prod|start -p port
- PORT_GRAPHQL don't change

Second, run the development server:

```bash
npm i
npm run dev
# or
yarn add
yarn dev
```

Open

- [http://localhost:3000](http://localhost:3000) with your browser to see the result.
- [http://localhost:4000/graphql](http://localhost:4000/graphql), is opening playground apollo graphql (on the address work subscriprions)

You can start editing the page by modifying `pages/index.ts`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
