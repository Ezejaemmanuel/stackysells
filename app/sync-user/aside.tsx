"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import { logout } from "@kinde-oss/kinde-auth-nextjs";

const AutoSignOut = () => {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        router.push("/api/auth/logout?post_logout_redirect_url=/");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    handleSignOut();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black">
      <p className="text-lg font-bold text-red-500 dark:text-red-400 md:text-xl">
        Error: Signing user out...
      </p>
    </div>
  );
};

export default AutoSignOut;
