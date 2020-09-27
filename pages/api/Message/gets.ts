import { API } from "..";
import { Types } from "mongoose";
import DataApi from "base/DataApi";
import { first } from "utils/array";
import { ID, Chat, InfoMore, Messages } from "@types";
import { NextApiRequest, NextApiResponse } from "next";
import chats from "models/chats";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { chatid, messageid, limit = 20 } = body as API.Message.GetsBody;

        const condition = !chatid || !limit;
        const resMes = "Enter chatid && limit != 0";
        if (!(await dataApi.WrongTrust(condition, resMes))) return;

        const [{ index, size }]: {
          size: number;
          index?: number;
        }[] = await chats
          .aggregate()
          .match({ _id: new Types.ObjectId(chatid) })
          .project({
            index: {
              $indexOfArray: ["$messages._id", new Types.ObjectId(messageid)],
            },
            size: { $size: "$messages" },
          });

        let start;
        if (limit > 0) start = index < 0 ? size - limit + 1 : index;
        else start = (index < 0 ? 0 : index) + limit;

        const Limit = Math.abs(limit);
        const end = start < 0 ? (index < 0 ? start + Limit : index) : Limit;
        start = start < 0 ? 0 : start;

        const chat_s: Chat[] = await chats.aggregate([
          { $match: { _id: new Types.ObjectId(chatid) } },
          {
            $project: {
              _id: true,
              firstMessage: { $arrayElemAt: ["$messages._id", 0] },
              lastMessage: { $arrayElemAt: ["$messages", -1] },
              messages: {
                $slice: ["$messages", start, end],
              },
            },
          },
        ]);

        const chat = first(chat_s);
        const isEndUp = (chat as any)?.firstMessage as ID;
        const isEndDown = chat?.lastMessage?._id;

        const InfoMore: InfoMore = {
          _id: chatid,
          size,
          isEndUp,
          isEndDown,
          lastIndex: messageid,
        };

        dataApi.True<Messages>({ Chat: chat, InfoMore } ?? "don't messages");
      } catch (error) {
        dataApi.Error(error, "Error request messages");
      }
      break;
    default:
      dataApi.Default();
  }
};
