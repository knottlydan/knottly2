"use client";

import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useTeam, PendingInvites, TeamMembers, InviteDialog, RevokeInviteDialog, ChangeRoleDialog, RemoveMemberDialog } from "./";

export function TeamContent() {
  const {
    setIsInviteDialogOpen
  } = useTeam();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Team Members</h3>
          <p className="text-sm text-muted-foreground">
            Manage your team members and their roles.
          </p>
        </div>
        <Button onClick={() => setIsInviteDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <PendingInvites />
      <TeamMembers />
      <InviteDialog />
      <RevokeInviteDialog />
      <ChangeRoleDialog />
      <RemoveMemberDialog />
    </div>
  );
} 