import { OAuthConfig } from "next-auth/providers";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import GitHubIcon from "@/components/provider-icons/GitHubIcon";
import GoogleIcon from "@/components/provider-icons/GoogleIcon";

export const enum NextAuthProvider {
  Google = "google",
  GitHub = "github",
}

export const nextAuthProviderList = [
  NextAuthProvider.Google,
  NextAuthProvider.GitHub,
] as const;

type NextAuthProviderMap = {
  [key in NextAuthProvider]: {
    name: string;
    ProviderIcon: () => JSX.Element;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    provider: OAuthConfig<any>;
  };
};

export const nextAuthProviderMap: NextAuthProviderMap = {
  [NextAuthProvider.Google]: {
    name: "Google",
    ProviderIcon: GoogleIcon,
    provider: GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  },
  [NextAuthProvider.GitHub]: {
    name: "GitHub",
    ProviderIcon: GitHubIcon,
    provider: GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  },
};
