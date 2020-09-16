import { API } from "..";
import users from "../../../models/users";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../apolloclient/types";
import DataApi from "../../../base/DataApi";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const userid = await dataApi.TrustUserID();
        if (!userid) return;

        const user: User = await users.findOne({ _id: userid });
        dataApi.True(user ?? "User don't exist");
      } catch (error) {
        dataApi.Error(error, "Error request id user");
      }
      break;
    default:
      dataApi.Default();
  }
};
