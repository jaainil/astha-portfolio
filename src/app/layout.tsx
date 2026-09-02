import type { Metadata } from "next";
import "@fontsource-variable/big-shoulders-display/wght";
import "@fontsource/barlow/300.css";
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/600.css";
import "@fontsource/barlow/700.css";
import "@fontsource/barlow/800.css";
import "./globals.css";
import { Grain } from "@/components/Grain";

export const metadata: Metadata = {
  title: "Astha Prajapati, Assistant General Manager at Eagle Pressure Systems",
  description:
    "Computer Engineering graduate leading GMP and project management as Assistant General Manager at Eagle Pressure Systems in Ahmedabad, India.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Grain />
        {children}
      </body>
    </html>
  );
}
