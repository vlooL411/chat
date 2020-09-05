import { NextApiRequest, NextApiResponse } from "next";
import users from "../../../models/users";
import { ID, User } from "../../../apolloclient/types";
import DataApi from "../DataApi";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        //public api
        const { name, email } = JSON.parse(body) as User;
        if (dataApi.Wrong(!name || !email, "Enter name or email")) return;

        const user: User = await users.findOne({ name, email }, "_id");

        dataApi.True(user ?? "User don't exist");
      } catch (error) {
        dataApi.Error(error, "Error request id user");
      }
      break;
    default:
      dataApi.Default();
  }
};
