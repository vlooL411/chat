import { Chat } from "../../../apolloclient/types";
import { NextApiRequest, NextApiResponse } from "next";
import chats from "../../../models/chats";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  switch (method) {
    case "POST":
      try {
        const { chat_id, message_id, user_id } = JSON.parse(body);

        if (!chat_id || !message_id) {
          res.status(201).json({ success: false, error: "data don't trust" });
          return;
        }
        const removeMessage: Chat = await chats.updateOne(
          { _id: chat_id },
          {
            $pull: {
              messages: { _id: message_id } as never,
            },
          },
          { multi: true }
        );

        res.send({
          success: true,
          data: removeMessage ? "Message remove" : "Message don't exist",
        });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false, error: "method don't exist" });
      break;
  }
};
