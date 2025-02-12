import { plans } from "@/db/schema/plans";
import { roleEnum } from "@/db/schema/organization";

export interface CurrentWorkspace {
  workspaceId: string;
  membershipId: string;
  role: typeof roleEnum; // TODO: Fix this
  currentPlan: {
    id: (typeof plans.$inferSelect)["id"];
    name: (typeof plans.$inferSelect)["name"];
    codename: (typeof plans.$inferSelect)["codename"];
    quotas: (typeof plans.$inferSelect)["quotas"];
    default: (typeof plans.$inferSelect)["default"];
  } | null;
}
