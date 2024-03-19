import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getUserAuth } from "@/lib/auth/utils";

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
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      banned: user.banned,
      emailAddresses: JSON.stringify(user.emailAddresses),
      phoneNumbers: JSON.stringify(user.phoneNumbers),
      primaryEmailAddressId: user.primaryEmailAddressId,
    },
    update: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      username: user.username,
      email:
        user.emailAddresses.find(
          (email) => email.id === user.primaryEmailAddressId,
        )?.emailAddress || "",
      imageUrl: user.imageUrl,
      updatedAt: new Date(),
    },
  });

  return AuthenticatedUser;
}
