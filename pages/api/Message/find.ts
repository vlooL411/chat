import { API } from "..";
import DataApi from "base/DataApi";
import { User, Chat } from "apolloclient/types";
import { NextApiRequest, NextApiResponse } from "next";
import users from "models/users";
import chats from "models/chats";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { text } = body as API.Message.FindBody;
        const userid = await dataApi.WrongTrustUserID(!text, "Enter text");
        if (!userid) return;

        const { chats_id }: User = await users.findOne(
          { _id: userid },
          "chats_id"
        );

        const chat_s = await chats.aggregate([
          {
            $match: {
              _id: { $in: chats_id },
              "messages.text": { $regex: text, $options: "i" },
            },
          },
          {
            $project: {
              title: true,
              date: true,
              creater: true,
              creater_id: true,
              access: true,
              messages: {
                $filter: {
                  input: "$messages",
                  as: "mes",
                  cond: {
                    $regexFind: {
                      input: "$$mes.text",
                      regex: text,
                      options: "i",
                    },
                  },
                },
              },
            },
          },
        ]);

        dataApi.True<Chat[]>(chat_s ?? "Messages don't find");
      } catch (error) {
        dataApi.Error(error, "Error request messages find");
      }
      break;
    default:
      dataApi.Default();
  }
};
