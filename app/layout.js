import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Space_Grotesk, Bricolage_Grotesque } from "next/font/google";
import Header from "@/components/header";
import { ClientWalletProvider } from "@/components/ClientProviders";

// Using Bricolage Grotesque for the body text
const bodyFont = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata = {
  title: "vista - web3 crowdfunding made easy",
  description: "a decentralized crowdfunding platform built on ethereum",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/images/vista-logo.svg" />
      </head>
      <body
        className={`${bodyFont.variable} ${spaceGrotesk.variable} font-body min-h-screen`}
      >
        <ClientWalletProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </ClientWalletProvider>
        <Analytics />
      </body>
    </html>
  );
}
