import users from "../../../models/users";
import { NextApiRequest, NextApiResponse } from "next";
import { ID, User } from "../../../apolloclient/types";
import DataApi from "../../../base/api/DataApi";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const id = body?.id as ID;
        if (dataApi.Wrong(!id, "id empty")) return;

        const userid = await dataApi.TrustUserID();
        if (!userid) return;

        const user: User = await users.findOne({ _id: id }, "name email image");

        dataApi.True(user ?? "User don't exist");
      } catch (error) {
        dataApi.Error(error, "Error request id user");
      }
      break;
    default:
      dataApi.Default();
  }
};
