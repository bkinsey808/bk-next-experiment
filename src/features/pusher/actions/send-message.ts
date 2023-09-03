"use server";

import { pusherServer } from "../helpers/pusherServer";

export const sendMessage = async ({
  channel,
  event,
  message,
}: {
  channel: string;
  event: string;
  message: string;
}) => {
  try {
    await pusherServer.trigger(channel, event, {
      message,
    });
  } catch (error) {
    console.error(error);
  }
};
