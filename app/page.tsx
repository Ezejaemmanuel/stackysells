import HeroSection from "@/components/herosection";
import Loader from "@/components/loader";
import SearchAnimation from "@/components/search";
import WhatIsStackItSells from "@/components/what-is-stack-it-sells";
import Workflow from "@/components/why-you-should-use-stackitsells";
import { checkAuth } from "@/lib/auth/utils";
import Image from "next/image";

export default async function Home() {
  // await checkAuth();
  return (
    <>
      <div className="container mx-auto max-w-7xl px-6 pt-20">
        <HeroSection />
        <WhatIsStackItSells />
        <SearchAnimation />
        <Workflow />
      </div>
    </>
  );
}

/*
so this is my landing page it would have these sectios 
1.hero section 
2.what you can do in the ecommerce website
3.what we offer
4.all theh categories of products and services we offer at here 
5.trending products in an horizontal scroll 
6.other types of procuts in a horizontal scroll also 
*/
