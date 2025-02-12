import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema/user";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { MeResponse } from "@/app/api/app/me/types";

export interface WithAuthHandler {
  (
    req: NextRequest,
    context: {
      session: NonNullable<
        Session & {
          user: MeResponse["user"];
        }
      >;
      params: Promise<Record<string, unknown>>;
    }
  ): Promise<NextResponse | Response>;
}

const withAuthRequired = (handler: WithAuthHandler) => {
  return async (
    req: NextRequest,
    context: {
      params: Promise<Record<string, unknown>>;
    }
  ) => {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "You are not authorized to perform this action",
        },
        { status: 401 }
      );
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .then((users) => users[0]);

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "You are not authorized to perform this action",
        },
        { status: 401 }
      );
    }
    return await handler(req, {
      ...context,
      session: {
        ...session,
        user: {
          ...session.user,
          ...user,
        },
      },
    });
  };
};

export default withAuthRequired;
