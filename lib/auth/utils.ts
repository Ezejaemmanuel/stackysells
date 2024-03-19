// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";

// export type AuthSession = {
//   session: {
//     user: {
//       id: string;
//       name?: string;
//       email?: string;
//     };
//   } | null;
// };

// export const getUserAuth = async () => {
//   // find out more about setting up 'sessionClaims' (custom sessions) here: https://clerk.com/docs/backend-requests/making/custom-session-token
//   const { userId, sessionClaims } = auth();
//   if (userId) {
//     return {
//       session: {
//         user: {
//           id: userId,
//           name: `${sessionClaims?.firstName} ${sessionClaims?.lastName}`,
//           email: sessionClaims?.email,
//         },
//       },
//     } as AuthSession;
//   } else {
//     return { session: null };
//   }
// };

// export const checkAuth = async () => {
//   const { userId } = auth();
//   if (!userId) redirect("/sign-in");
// };

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export type AuthSession = {
  session: {
    user: {
      id: string;
      userName?: string;
      firstName?: string;
      fullName?: string;
      imageUrl?: string;
      email?: string;
    };
  } | null;
};

export const getUserAuth = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log("this is the kinde user properly", user);

  if (user) {
    return {
      session: {
        user: {
          id: user.id,
          userName: user.given_name,
          firstName: user.family_name,
          fullName: `${user.given_name} ${user.family_name}`,
          imageUrl: user.picture,
          email: user.email,
        },
      },
    } as AuthSession;
  } else {
    return { session: null };
  }
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  console.log("see the user data ", session);
  if (session === null) redirect("/api/auth/login");
};
