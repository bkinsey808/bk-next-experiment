import { kv } from "@vercel/kv";

/** abstracted to make it easier to swap with another redis solution like upstash if desired */
export const redis = kv;
