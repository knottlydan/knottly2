"use client";

import React, { useState, useEffect } from "react";
import useUser from "@/lib/users/useUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Boxes,
  LifeBuoy,
  Settings,
  LogOut,
  User,
  Menu,
  ChevronLeft,
  FileText,
  Map,
  CreditCard,
  Users,
  Plus,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InAppFooter } from "@/components/layout/in-app-footer";

function NavItem({
  href,
  icon: Icon,
  children,
  className,
  isNew,
  isCollapsed,
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
  isNew?: boolean;
  isCollapsed?: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const content = (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        isCollapsed && "justify-center px-2",
        className
      )}
    >
      <Icon className={cn(
        "h-5 w-5",
        "transition-transform duration-100",
        isActive ? "text-inherit" : "text-inherit"
      )} />
      {!isCollapsed && (
        <>
          <span>{children}</span>
          {isNew && (
            <Badge variant="secondary" className="ml-auto text-[10px] h-4 bg-accent/10 text-accent font-medium">
              New
            </Badge>
          )}
        </>
      )}
    </Link>
  );

  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          {children}
          {isNew && " (New)"}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

function OrganizationSwitcher({ className, isCollapsed }: { className?: string, isCollapsed?: boolean }) {
  const organizations = [
    { id: 1, name: "Acme Inc", logo: "/logo.png" as string | undefined },
    { id: 2, name: "Personal", logo: undefined },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            "rounded-lg border border-border/40",
            className
          )}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Avatar className="h-6 w-6 rounded-md">
              <AvatarImage src={organizations[0].logo} alt="" className="object-cover" />
              <AvatarFallback className="rounded-md text-xs">
                {getInitials(organizations[0].name)}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <span className="truncate">{organizations[0].name}</span>
            )}
          </div>
          {!isCollapsed && <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-100" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={isCollapsed ? "center" : "start"} 
        className="w-64"
      >
        {organizations.map((org) => (
          <DropdownMenuItem key={org.id} className="flex items-center gap-2 p-2">
            <Avatar className="h-8 w-8 rounded-md">
              <AvatarImage src={org.logo} alt="" className="object-cover" />
              <AvatarFallback className="rounded-md">
                {getInitials(org.name)}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{org.name}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem className="flex items-center gap-2 p-2 text-primary">
          <div className="h-8 w-8 rounded-md border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
            <Plus className="h-4 w-4" />
          </div>
          <span className="font-medium">Create Organization</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SidebarContent({ className, isCollapsed }: { className?: string; isCollapsed?: boolean }) {
  const { user } = useUser();

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();
    }
    if (email) {
      return email
        .split("@")[0]
        .slice(0, 2)
        .toUpperCase();
    }
    return "U";
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Organization Switcher */}
      <div className={cn(
        "mb-6",
        isCollapsed ? "px-2" : "px-2"
      )}>
        <OrganizationSwitcher isCollapsed={isCollapsed} />
      </div>

      {/* Main Navigation */}
      <nav className={cn(
        "space-y-1 flex-1",
        isCollapsed ? "px-2" : "px-2"
      )}>
        <NavItem href="/app" icon={LayoutDashboard} isCollapsed={isCollapsed}>
          Dashboard
        </NavItem>
        <NavItem href="/app/stuff" icon={Boxes} isCollapsed={isCollapsed}>
          Stuff
        </NavItem>
        <NavItem href="/app/support" icon={LifeBuoy} isCollapsed={isCollapsed}>
          Support
        </NavItem>
        <NavItem 
          href="https://docs.indiekit.com" 
          icon={FileText} 
          isCollapsed={isCollapsed}
          className="!text-muted-foreground hover:!text-accent-foreground"
        >
          Documentation
        </NavItem>
        <NavItem 
          href="https://roadmap.indiekit.com" 
          icon={Map} 
          isCollapsed={isCollapsed}
          className="!text-muted-foreground hover:!text-accent-foreground"
        >
          Roadmap
        </NavItem>
      </nav>

      {/* Divider */}
      <div className={cn(
        "my-2 border-t border-border/40",
        isCollapsed ? "mx-2" : "mx-2"
      )} />

      {/* Bottom Navigation */}
      <div className={cn(
        "space-y-1",
        isCollapsed ? "px-2" : "px-2"
      )}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                "rounded-md",
                isCollapsed && "justify-center px-2"
              )}
            >
              <Settings className="h-5 w-5 text-inherit" />
              {!isCollapsed && "Settings"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align={isCollapsed ? "center" : "start"} 
            className="w-48"
          >
            <DropdownMenuItem asChild>
              <Link href="/app/settings" className="flex items-center font-medium">
                <Settings className="h-4 w-4 mr-2 text-inherit" />
                General
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/app/settings/team" className="flex items-center font-medium">
                <Users className="h-4 w-4 mr-2 text-inherit" />
                Team
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/app/settings/billing" className="flex items-center font-medium">
                <CreditCard className="h-4 w-4 mr-2 text-inherit" />
                Billing
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                "rounded-md",
                isCollapsed && "justify-center px-2"
              )}
            >
              <Avatar className="h-5 w-5 rounded-full">
                <AvatarImage src={user?.image || undefined} alt="" />
                <AvatarFallback className="text-xs">
                  {getInitials(user?.name, user?.email)}
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && "Account"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center gap-3 p-2 pb-3">
              <Avatar className="h-9 w-9 rounded-full">
                <AvatarImage src={user?.image || undefined} alt="" />
                <AvatarFallback>
                  {getInitials(user?.name, user?.email)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-none">
                  {user?.name || 'Anonymous'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </div>
            <DropdownMenuItem asChild>
              <Link href="/app/account" className="flex items-center font-medium">
                <User className="h-4 w-4 mr-2 text-inherit" />
                Account Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => signOut()}
              className="flex items-center text-destructive focus:text-destructive font-medium"
            >
              <LogOut className="h-4 w-4 mr-2 text-inherit" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useUser();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Close mobile menu when route changes
  const pathname = usePathname();
  useEffect(() => {
    // Remove the setIsMobileOpen call since we no longer need it
  }, [pathname]);

  if (isLoading) {
    return null; // Or a simple loading spinner
  }

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-background">
        {/* Desktop Sidebar */}
        <div className={cn(
          "hidden md:flex flex-col border-r border-border/40",
          isCollapsed ? "w-[80px]" : "w-64",
          "transition-all duration-300"
        )}>
          <div className="p-3 flex-1">
            <SidebarContent isCollapsed={isCollapsed} />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="mb-3 mx-auto hover:bg-accent"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronLeft className={cn(
              "h-4 w-4 text-inherit transition-transform duration-100",
              isCollapsed && "rotate-180"
            )} />
            <span className="sr-only">
              {isCollapsed ? "Expand" : "Collapse"} Sidebar
            </span>
          </Button>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-border/40 bg-background z-30 px-4">
          <div className="flex items-center justify-between h-full">
            <div className="w-[180px]">
              <OrganizationSwitcher />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent"
                >
                  <Menu className="h-5 w-5 text-inherit" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 p-0 pt-16">
                <div className="p-3">
                  <SidebarContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto md:pt-0 pt-16">
            <div className="p-6 max-w-7xl mx-auto w-full">
              {children}
            </div>
          </div>
          <InAppFooter />
        </div>
      </div>
    </TooltipProvider>
  );
}

export default AppLayout;
