import { kv } from "@vercel/kv";

/** abstracted to make it easier to swap with another redis solution like upstash if desired */
export const redis = kv;

export const getLastLoginKey = (email: string) => `${email}.lastLogin`;

export const getProviderKey = (email: string, provider: string) =>
  `${email}.providers.${provider}`;

export const getAuthLevelKey = (email: string) => `${email}.authLevel`;

export const getLinkedProvidersKey = (email: string) =>
  `${email}.linkedProviders`;

export const getUsernameKey = (email: string) => `${email}.username`;
