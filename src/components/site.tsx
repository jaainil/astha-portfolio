"use client";

import type { ReactNode } from "react";
import { Chrome } from "@/components/chrome";
import { ScrollProvider } from "@/components/motion";

export default function Site({ children }: { children: ReactNode }) {
  return <ScrollProvider fixed={<Chrome />}>{children}</ScrollProvider>;
}
