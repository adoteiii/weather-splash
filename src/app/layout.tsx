import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import { LayoutManager } from "@/components/Layout";
import { NextThemesProvider } from "@/components/providers/NextThemesProvider";
import { AuthContext } from "@/lib/userContext";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebaseserver";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WeatherSplash",
  description: "Your Premium all in one Weather App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser } = await getAuthenticatedAppForUser(undefined);
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AuthContext initialUser={currentUser}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReduxProvider>
              <>
                <LayoutManager></LayoutManager>
                {children}
              </>
            </ReduxProvider>
          </NextThemesProvider>
        </AuthContext>
      </body>
    </html>
  );
}
