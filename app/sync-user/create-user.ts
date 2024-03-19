import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getUserAuth } from "@/lib/auth/utils";
import { UserRole } from "@prisma/client";

export async function createUser() {
  const { session } = await getUserAuth();
  if (!session) {
    redirect("/api/auth/login");
  }
  const { user } = session;
  if (!user.email) {
    throw new Error("email must be provied");
  }
  const AuthenticatedUser = await prisma.user.upsert({
    where: { id: user.id },
    create: {
      id: user.id,
      userName: user.userName,
      firstName: user.firstName,
      fullName: user.fullName,
      email: user.email,
      imageUrl: user.imageUrl,
      role: UserRole.Buyer,
    },
    update: {
      id: user.id,
      userName: user.userName,
      firstName: user.firstName,
      fullName: user.fullName,
      email: user.email,
      imageUrl: user.imageUrl,
    },
  });

  return AuthenticatedUser;
}
