import { db } from "@/db";
import { onboardingDataSchema, organizations } from "@/db/schema/organization";
import { organizationMemberships } from "@/db/schema/organization-membership";
import { plans } from "@/db/schema/plans";
import { eq } from "drizzle-orm";
import { kebabCase } from "lodash";
import { getZodDefaults } from "../utils";

export type CreateOrganizationInput = {
  name: string;
  userId: string;
};

export async function createOrganization({
  name,
  userId,
}: CreateOrganizationInput) {
  return await db.transaction(async (tx) => {
    // Get the default plan
    const defaultPlan = await tx
      .select()
      .from(plans)
      .where(eq(plans.default, true))
      .limit(1);

    // Generate a unique slug from the organization name
    const baseSlug = kebabCase(name);
    let slug = baseSlug;
    let counter = 1;

    // Keep checking until we find a unique slug
    while (true) {
      const existingOrg = await tx
        .select()
        .from(organizations)
        .where(eq(organizations.slug, slug))
        .limit(1);

      if (!existingOrg) break;

      // If slug exists, append counter and try again
      counter++;
      slug = `${baseSlug}-${counter}`;
    }

    // Create the organization
    const [organization] = await tx
      .insert(organizations)
      .values({
        name,
        slug,
        planId: defaultPlan[0]?.id, // Set the default plan if one exists
        onboardingDone: false,
        onboardingData: getZodDefaults(onboardingDataSchema),
      })
      .returning();

    // Create owner membership for the user
    await tx.insert(organizationMemberships).values({
      organizationId: organization.id,
      userId,
      role: "owner",
    });

    return organization;
  });
}
