import { Chat } from "./../../../apolloclient/types";
import { NextApiRequest, NextApiResponse } from "next";
import chats from "../../../models/chats";
import DataApi from "../../../base/api/DataApi";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { title } = body;

        if (dataApi.Wrong(!title, "Data wrong: Enter title")) return;

        const userid = await dataApi.TrustUserID();
        if (!userid) return;

        if (!userid || !title) {
          res.send({ success: true, data: "Data is wrong" });
          return;
        }

        const chat_s: Chat[] = await chats.insertMany([
          {
            creater_id: userid,
            date: new Date(),
            title: title,
          },
        ]);

        dataApi.True<Chat>(chat_s?.pop() ?? "Chat don't insert");
      } catch (error) {
        dataApi.Error(error, "Error request insert chat");
      }
      break;
    default:
      dataApi.Default();
  }
};
