"use client";

import { ReactNode, useMemo, useState } from "react";
import { DashboardSidebar } from "./sidebar";
import { DashboardTopbar } from "./topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProviderDialogProvider } from "./provider-dialog-context";
import { ConnectProviderDialog } from "./connect-provider-dialog";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [providerDialogOpen, setProviderDialogOpen] = useState(false);

  const providerDialogValue = useMemo(
    () => ({
      open: providerDialogOpen,
      setOpen: setProviderDialogOpen,
      openDialog: () => setProviderDialogOpen(true),
      closeDialog: () => setProviderDialogOpen(false),
    }),
    [providerDialogOpen]
  );

  return (
    <ProviderDialogProvider value={providerDialogValue}>
      <ConnectProviderDialog open={providerDialogOpen} onOpenChange={setProviderDialogOpen} />
      <div className="flex min-h-screen bg-background transition-colors duration-300">
        <DashboardSidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />
        <div className="flex flex-1 flex-col">
          <DashboardTopbar
            onOpenSidebar={() => setSidebarOpen(true)}
            onConnectProvider={() => setProviderDialogOpen(true)}
          />
          <ScrollArea className="flex-1">
            <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 animate-in">
              {children}
            </main>
          </ScrollArea>
        </div>
      </div>
    </ProviderDialogProvider>
  );
}
