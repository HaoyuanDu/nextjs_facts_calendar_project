import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import type { NextPage } from "next";
import App from "./_app";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <App />;
}
