"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Building2,
} from "lucide-react";
import { ThemeSwitcher } from "../theme-switcher";
import { appConfig } from "@/lib/config";

export function InAppFooter() {
  return (
    <footer className="border-t border-border/40 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-14 items-center justify-between px-4">
        <nav className="flex items-center space-x-4 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {appConfig.projectName}
        </nav>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link href="/app/switch" className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4" />
              <span>Switch Organization</span>
            </Link>
          </Button>
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
}
