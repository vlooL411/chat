import DataApi from 'base/DataApi'
import users from 'models/users'
import { NextApiRequest, NextApiResponse } from 'next'
import { QueryUserArgs, User } from '@generated/backend'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { id } = body as QueryUserArgs;
        if (!dataApi.WrongTrust(!id, "id empty")) return;

        const user: User = await users.findOne(
          { _id: id },
          "_id name email image status dateLastOnline"
        );

        dataApi.True(user ?? "User don't exist");
      } catch (error) {
        dataApi.Error(error, "Error request get user");
      }
      break;
    default:
      dataApi.Default();
  }
};
