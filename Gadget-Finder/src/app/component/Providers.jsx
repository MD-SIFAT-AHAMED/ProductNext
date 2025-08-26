"use client";

import { SessionProvider } from "next-auth/react";
import { Providers as ThemeProviders } from "../ThemeProvider";
import { LoadingProvider } from "../../context/LoadingContext";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <LoadingProvider>
        <ThemeProviders attribute="class" disableTransitionOnChange>
          {children}
        </ThemeProviders>
      </LoadingProvider>
    </SessionProvider>
  );
}
