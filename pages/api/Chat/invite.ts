import DataApi from 'base/DataApi'
import chats from 'models/chats'
import users from 'models/users'
import { Chat, MutationInviteChatArgs } from '@backend'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { chatid } = body as MutationInviteChatArgs;
        const userid = await dataApi.WrongTrustUserID(!chatid, "Enter chatid");
        if (!userid) return;

        const { okUser } = await users.updateOne(
          { _id: userid },
          { $addToSet: { chats_id: chatid as never } }
        );

        if (okUser == 0) {
          dataApi.True<Chat>("User don't join chat");
          return;
        }

        const { ok: okChat } = await chats.updateOne(
          { _id: chatid },
          { $addToSet: { users_id: userid as never } }
        );

        let chat: Chat =
          okChat != 0 ? await chats.findOne({ _id: chatid }) : null;

        dataApi.True<Chat>(
          okUser != 0 && okChat != 0 ? chat : "User don't join chat"
        );
      } catch (error) {
        dataApi.Error(error, "Error request invite chat");
      }
      break;
    default:
      dataApi.Default();
  }
};
