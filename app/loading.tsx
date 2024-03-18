// import Loader from "@/components/loader";

// export default function Loading() {
//   return <Loader />;
// }

import Loader from "@/components/loader";

export default function Loading() {
  return (
    <div className="relative  flex justify-center items-center  bg-opacity-30 backdrop-blur-sm">
      <Loader />
    </div>
  );
}
