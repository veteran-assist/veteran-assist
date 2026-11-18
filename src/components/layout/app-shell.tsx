import type { ReactNode } from "react";
import { CrisisBar } from "./crisis-bar";
import { PrivacyBar } from "./privacy-bar";
import { Header } from "./header";
import { Footer } from "./footer";
import { ServiceStripe } from "@/components/service-stripe";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen min-h-dvh flex-col bg-paper text-ink print:block print:min-h-0">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-forest focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="print:hidden">
        <CrisisBar />
        <ServiceStripe />
        <Header />
        <PrivacyBar />
      </div>
      <div id="main" className="flex-1">
        {children}
      </div>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
