import { organizations } from "@/db/schema";
import { organizationMemberships } from "@/db/schema";
import type { InferSelectModel } from "drizzle-orm";

export type Organization = InferSelectModel<typeof organizations>;
export type OrganizationMembership = InferSelectModel<
  typeof organizationMemberships
>;
