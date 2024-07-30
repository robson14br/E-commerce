import type { Metadata } from "next";
import clsx from "clsx";
import { Inter } from "next/font/google";
import { Navbar } from "./components/Navbar";
import "./globals.css";

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
    <html lang="pt-br">
      <body className={clsx(inter.className, 'bg-slate-700')}>
        <Navbar />

        <main className="h-screen p-16">{children}</main>
      </body>
    </html>
  );
}
