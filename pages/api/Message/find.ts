import DataApi from 'base/DataApi'
import chats from 'models/chats'
import users from 'models/users'
import { Chat, QueryFindMessageArgs, User } from '@backend'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { text } = body as QueryFindMessageArgs;
        const userid = await dataApi.WrongTrustUserID(!text, "Enter text");
        if (!userid) return;

        const { chats_id }: User = await users.findOne(
          { _id: userid },
          "_id chats_id"
        );

        const chat_s = await chats
          .aggregate()
          .match({
            _id: { $in: chats_id },
            "messages.text": { $regex: text, $options: "i" },
          })
          .project({
            title: true,
            date: true,
            creater: true,
            creaters_id: true,
            access: true,
            messages: {
              $filter: {
                input: "$messages",
                as: "mes",
                cond: {
                  $regexMatch: {
                    input: "$$mes.text",
                    regex: text,
                    options: "i",
                  },
                },
              },
            },
          });

        dataApi.True<Chat[]>(chat_s ?? "Messages don't finded");
      } catch (error) {
        dataApi.Error(error, "Error request messages find");
      }
      break;
    default:
      dataApi.Default();
  }
};
