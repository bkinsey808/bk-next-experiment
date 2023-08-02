import { OAuthConfig } from "next-auth/providers";
import AzureADProvider from "next-auth/providers/azure-ad";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import GitHubIcon from "@/components/provider-icons/GitHubIcon";
import GoogleIcon from "@/components/provider-icons/GoogleIcon";
import MicrosoftIcon from "@/components/provider-icons/MicrosoftIcon";

export const enum NextAuthProvider {
  Google = "google",
  GitHub = "github",
  Microsoft = "azure-ad",
}

export const nextAuthProviderList = [
  NextAuthProvider.Google,
  NextAuthProvider.GitHub,
  NextAuthProvider.Microsoft,
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
  [NextAuthProvider.Microsoft]: {
    name: "Microsoft",
    ProviderIcon: MicrosoftIcon,
    provider: AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "",
      tenantId: process.env.AZURE_AD_TENANT_ID || "",
    }),
  },
};
