"use server";

import { pusherServer } from "../helpers/pusherServer";

export const sendMessage = ({
  channel,
  event,
  message,
}: {
  channel: string;
  event: string;
  message: string;
}) => {
  pusherServer.trigger(channel, event, {
    message,
  });
};
