import type { Metadata } from "next";
import JoinClient from "./page-client";

export const metadata: Metadata = {
  title: "انضم إلينا | UGET",
  description: "انضم إلى صفوف الاتحاد العام لطلبة تونس وكن جزءاً من التغيير.",
};

export default function JoinPage() {
  return <JoinClient />;
}
