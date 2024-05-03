import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getUserAuth } from "@/lib/auth/utils";
import { users, UserRole, UserRoleEnum } from "@/lib/db/schema/all-schema";
import { eq } from "drizzle-orm";

export async function createUser() {
  const { session } = await getUserAuth();
  if (!session) {
    redirect("/api/auth/login");
  }
  const { user } = session;
  if (!user.email) {
    throw new Error("email must be provided");
  }

  // Check if the user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  if (existingUser.length > 0) {
    // User already exists, update the user data
    const updatedUser = await db
      .update(users)
      .set({
        userName: user.userName,
        firstName: user.firstName,
        fullName: user.fullName,
        email: user.email,
        imageUrl: user.imageUrl,
      })
      .where(eq(users.id, user.id))
      .returning();

    return updatedUser[0];
  } else {
    // User doesn't exist, create a new user
    const newUser = await db
      .insert(users)
      .values({
        id: user.id,
        userName: user.userName,
        firstName: user.firstName,
        fullName: user.fullName,
        email: user.email,
        imageUrl: user.imageUrl,
        role: UserRoleEnum.Buyer,
      })
      .returning();

    return newUser[0];
  }
}
