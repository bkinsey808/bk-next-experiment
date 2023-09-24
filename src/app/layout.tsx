import { KumaRegistry } from "@kuma-ui/next-plugin/registry";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ReactNode } from "react";

import "./globals.css";
import AuthProvider from "@/features/auth/components/auth-provider";
import DarkModeProvider from "@/features/auth/components/dark-mode-provider";
import { DARK_MODE_LOCAL_STORAGE_KEY } from "@/helpers/darkMode";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script id="test">
          {`if (localStorage['${DARK_MODE_LOCAL_STORAGE_KEY}'] === 'dark' || (!('${DARK_MODE_LOCAL_STORAGE_KEY}' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }`}
        </Script>
      </head>
      <body className={inter.className}>
        <DarkModeProvider>
          <AuthProvider>
            <KumaRegistry>{children}</KumaRegistry>
          </AuthProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
