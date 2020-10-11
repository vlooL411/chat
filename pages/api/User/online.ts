import DataApi from 'base/DataApi'
import users from 'models/users'
import { User } from '@backend'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const userid = await dataApi.TrustUserID();
        if (!userid) return;

        const { ok } = await users.updateOne({ _id: userid }, {
          dateLastOnline: new Date(),
        } as User);
        dataApi.True(
          ok != 0 ? "User update online" : "User don't update online"
        );
      } catch (error) {
        dataApi.Error(error, "Error request update online user");
      }
      break;
    default:
      dataApi.Default();
  }
};
