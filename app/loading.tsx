// import Loader from "@/components/loader";

// export default function Loading() {
//   return <Loader />;
// }
"use client";
import Loader from "@/components/loader";

export default function Loading() {
  return (
    <div className="relative container  flex items-center justify-center  bg-opacity-30 backdrop-blur-sm">
      <Loader />
    </div>
  );
}
