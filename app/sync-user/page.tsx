// pages/calculateResult.tsx
"use client";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { useRouter } from "next/navigation";
import AutoSignOut from "./aside";
import { addBaseURL } from "@/lib/addBaseUrl";
import Loader from "@/components/loader";

const CalculateResult = () => {
  const router = useRouter();

  const {
    mutateAsync: syncUser,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationKey: ["sync-user"],
    mutationFn: async () => {
      const response = await fetch(addBaseURL("api/syncUser"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Include necessary data for the mutation
      });

      if (!response.ok) {
        throw new Error("Failed to calculate result");
      }

      return response.json();
    },
    onSuccess: () => {
      router.push("/user-dashboard");
    },
  });

  useEffect(() => {
    syncUser();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
      {isPending && <Loader />}
      {isError && <AutoSignOut />}
      {isSuccess && <MdCheckCircle className="text-green-500" size="150" />}
    </div>
  );
};

export default CalculateResult;
