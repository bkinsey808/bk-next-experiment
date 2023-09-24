"use server";

import { pusherServer } from "@/features/pusher/helpers/pusherServer";
import { redis } from "@/helpers/redis";

export const setPosition = async (position?: number) => {
  console.log("set position: ", position);
  await redis.set("position", position);
  await pusherServer.trigger("presentation", "setPosition", {
    position,
  });
};
