import type { Metadata } from "next";
import PageClient from "./page-client";

export const metadata: Metadata = {
  title: "الاتحاد العام لطلبة تونس | UGET",
  description: "نضال، استقلالية، صمود، ديمقراطية. الموقع الرسمي للاتحاد العام لطلبة تونس.",
};

export default function Home() {
  return <PageClient />;
}
