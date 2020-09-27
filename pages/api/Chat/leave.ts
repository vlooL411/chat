import DataApi from 'base/DataApi'
import chats from 'models/chats'
import users from 'models/users'
import { Chat } from '@types'
import { NextApiRequest, NextApiResponse } from 'next'

import { API } from '..'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { chatid } = body as API.Chat.LeaveBody;
        const userid = await dataApi.WrongTrustUserID(!chatid, "Enter chatid");
        if (!userid) return;

        const { okUser } = await users.updateOne(
          { _id: userid },
          { $pull: { chats_id: chatid as never } },
          { multi: true }
        );

        if (okUser == 0) {
          dataApi.True<Chat>("User don't leave chat");
          return;
        }

        const { ok: okChat } = await chats.updateOne(
          { _id: chatid },
          { $pull: { users_id: userid as never } },
          { multi: true }
        );

        dataApi.True<Chat>(
          okUser != 0 && okChat != 0
            ? ({ _id: chatid } as Chat)
            : "User don't leave chat"
        );
      } catch (error) {
        dataApi.Error(error, "Error request leave chat");
      }
      break;
    default:
      dataApi.Default();
  }
};
