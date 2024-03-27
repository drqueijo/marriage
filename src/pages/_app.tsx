import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import Header from "@/components/Header/Header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <title>Juliana & Gabriel</title>
      <main className={`font-sans ${inter.variable}`}>
        <Component {...pageProps} />
      </main>
      <Toaster />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
