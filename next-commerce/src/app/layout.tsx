import type { Metadata } from "next";
import clsx from "clsx";
import { Inter } from "next/font/google";
import { Navbar } from "./components/Navbar";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { ptBR } from "@clerk/localizations";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next E-commerce",
  description: "Fazendo e-commerce com Next",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={ptBR}>
    <html lang="pt-br">
      <body className={clsx(inter.className, 'bg-slate-700')}>
        <Navbar />

        <main className="h-screen p-16">{children}</main>
      </body>
    </html>
    </ClerkProvider>
  );
}
