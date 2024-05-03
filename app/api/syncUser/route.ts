import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { users } from "@/lib/db/schema/all-schema";
import { db } from "@/lib/db";
import { createUser } from "@/app/sync-user/create-user";

export async function POST(
  request: NextRequest,
  res: NextResponse,
): Promise<NextResponse> {
  console.log("POST function started");
  const { session } = await getUserAuth();
  try {
    console.log("Attempting to authenticate user");
    console.log(`Authenticated user ID: ${session}`);
    if (!session) {
      console.log("No user ID found, redirecting to sign-in");
      throw new Error("No user ID found, redirecting to sign-in page.");
    }
    console.log("Fetching user from database");
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);
    console.log(`User fetched from database: ${JSON.stringify(user)}`);
    if (user.length > 0) {
      console.log("User found, redirecting to user-dashboard");
      return NextResponse.json(user[0], { status: 200 });
    }
    console.log("Creating user through webhook");
    const fromSyncingUser = await createUser();
    console.log(`User created: ${JSON.stringify(fromSyncingUser)}`);
    console.log("Returning response with status 200");
    return NextResponse.json(fromSyncingUser, { status: 200 });
  } catch (error: unknown) {
    console.log("An error occurred", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(`Error message: ${errorMessage}`);

    console.log("Returning error response with status 500");
    return NextResponse.json(
      {
        error:
          "An unknown error occurred while updating the token price: " +
          errorMessage,
      },
      { status: 500 },
    );
  }
}
