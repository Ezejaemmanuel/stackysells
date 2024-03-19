"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AutoSignOut = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    signOut().then(() => {
      router.push("/");
    });
  }, [signOut, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black">
      <p className="text-lg font-bold text-red-500 dark:text-red-400 md:text-xl">
        Error: Signing user out...
      </p>
    </div>
  );
};

export default AutoSignOut;
