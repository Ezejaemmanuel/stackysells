import Image from "next/image";
import Loader from "./loader";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-3 lg:mt-10">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Discover &amp; Thrive with
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}
          StackItSells
        </span>
      </h1>
      <p className="mt-10 md:text-lg text-sm text-center text-neutral-300 max-w-4xl">
        Whether you're looking to buy first-hand treasures, find second-hand
        gems, or sell your own products, StackItSells is your go-to marketplace.
        Dive into a world of opportunities and build your e-commerce presence on
        a platform designed to amplify your reach and maximize your profits—all
        at an incredibly low cost.
      </p>
      <div className="flex justify-center my-10">
        <a
          href="#"
          className="bg-gradient-to-r from-orange-500 to-red-800 py-3 px-4 mx-3 rounded-md text-white"
        >
          Start Buying
        </a>
        <a
          href="/adminDashboards"
          className="py-3 px-4 mx-3 rounded-md border border-orange-500 text-green-500"
        >
          Start Selling
        </a>
      </div>
      <div className="flex mt-3 justify-center">
        {/* <Image
          src={"/hero-section-1.jpg"}
          height={350}
          width={350}
          alt="Hero Section Image"
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        /> */}

        {/* <Image
          src={"/hero-section-2.jpg"}
          height={350}
          width={350}
          alt="Hero Section Image"
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        /> */}
        <Loader />
      </div>
    </div>
  );
};

export default HeroSection;
