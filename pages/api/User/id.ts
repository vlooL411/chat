import DataApi from 'base/DataApi'
import users from 'models/users'
import { QueryUserIdArgs, User } from '@backend'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        //public api
        const { name, email } = body as QueryUserIdArgs;
        if (dataApi.Wrong(!name || !email, "Enter name and email")) return;

        const user: User = await users.findOne({ name, email }, "_id");
        dataApi.True(user ?? "User don't exist");
      } catch (error) {
        dataApi.Error(error, "Error request get id user");
      }
      break;
    default:
      dataApi.Default();
  }
};
