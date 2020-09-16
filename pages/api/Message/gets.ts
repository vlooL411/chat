import { API } from "..";
import { Types } from "mongoose";
import DataApi from "base/DataApi";
import { NextApiRequest, NextApiResponse } from "next";
import { Chat, InfoMore, Messages } from "apolloclient/types";
import chats from "models/chats";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const {
          chatid,
          lastMessageID: lastID,
          limit = 20,
        } = body as API.Message.GetsBody;

        if (!(await dataApi.WrongTrust(!chatid, "Enter chatid"))) return;

        const [{ index, size }]: {
          size: number;
          index?: number;
        }[] = await chats.aggregate([
          { $match: { _id: new Types.ObjectId(chatid) } },
          {
            $project: {
              index: {
                $indexOfArray: ["$messages._id", new Types.ObjectId(lastID)],
              },
              size: { $size: "$messages" },
            },
          },
        ]);

        let end = index == -1 ? size : index;
        let start = end - limit;

        if (start < 0) {
          start = 0;
          if (index != -1) end = index;
        }

        const isEnd = size == 0 || start == 0;
        const isEndSlice = start == 0 && end == 0;

        const InfoMore: InfoMore = {
          size,
          isEnd,
          lastIndex: lastID,
        };

        console.log(index, size, start, end, isEnd, isEndSlice);

        if (isEndSlice) {
          dataApi.True<Messages>({ Chat: null, InfoMore });
          return;
        }

        const chat: Chat[] = await chats.aggregate([
          { $match: { _id: new Types.ObjectId(chatid) } },
          {
            $project: {
              _id: true,
              lastMessage: { $arrayElemAt: ["$messages", -1] },
              messages: isEndSlice
                ? null
                : { $slice: ["$messages", start, end < limit ? end : limit] },
            },
          },
        ]);

        dataApi.True<Messages>({ Chat: chat[0], InfoMore } ?? "don't messages");
      } catch (error) {
        dataApi.Error(error, "Error request messages");
      }
      break;
    default:
      dataApi.Default();
  }
};
