
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';


export async function createUser() {
    const user = await currentUser();
    if (!user) {
        redirect("/sign-in")
    }
    const AuthenticatedUser = await prisma.user.upsert({
        where: { id: user.id },
        create: {
            id: user.id,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            username: user.username,
            email: user.emailAddresses.find(email => email.id === user.primaryEmailAddressId)?.emailAddress || '',
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
            email: user.emailAddresses.find(email => email.id === user.primaryEmailAddressId)?.emailAddress || '',
            imageUrl: user.imageUrl,
            updatedAt: new Date(),
        },
    });

    return AuthenticatedUser;
}
