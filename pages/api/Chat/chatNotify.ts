import { Message, ID } from "../../../apolloclient/types";
import { Chat } from "../../../apolloclient/types";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/dbConnect";
import chats from "models/chats";
import { Types } from "mongoose";
import users from "../../../models/users";

export default async (message) => {
  const { chat_id, data } = message;

  const chat = await chats.findOne({ id: chat_id }, "users");
  const users_id = chat?.users_id as ID[];
  await users_id.map((userid) =>
    users.updateOne(
      { id: userid },
      {
        $push: {
          notifications: data as never,
        },
      }
    )
  );
};
