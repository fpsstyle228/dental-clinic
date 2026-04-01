import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n.server";

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
