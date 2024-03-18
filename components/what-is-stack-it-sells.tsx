// import {
//   BotMessageSquare,
//   Fingerprint,
//   ShieldHalf,
//   BatteryCharging,
//   PlugZap,
//   GlobeLock,
// } from "lucide-react";

// export const features = [
//   {
//     icon: <BotMessageSquare />,
//     text: "Drag-and-Drop Interface",
//     description:
//       "Easily design and arrange your VR environments with a user-friendly drag-and-drop interface.",
//   },
//   {
//     icon: <Fingerprint />,
//     text: "Multi-Platform Compatibility",
//     description:
//       "Build VR applications that run seamlessly across multiple platforms, including mobile, desktop, and VR headsets.",
//   },
//   {
//     icon: <ShieldHalf />,
//     text: "Built-in Templates",
//     description:
//       "Jumpstart your VR projects with a variety of built-in templates for different types of applications and environments.",
//   },
//   {
//     icon: <BatteryCharging />,
//     text: "Real-Time Preview",
//     description:
//       "Preview your VR application in real-time as you make changes, allowing for quick iterations and adjustments.",
//   },
//   {
//     icon: <PlugZap />,
//     text: "Collaboration Tools",
//     description:
//       "Work together with your team in real-time on VR projects, enabling seamless collaboration and idea sharing.",
//   },
//   {
//     icon: <GlobeLock />,
//     text: "Analytics Dashboard",
//     description:
//       "Gain valuable insights into user interactions and behavior within your VR applications with an integrated analytics dashboard.",
//   },
// ];

// const WhatIsStackItSells = () => {
//   return (
//     <div className="relative mt-20 border-b border-neutral-800 min-h-[800px]">
//       <div className="text-center">
//         <span className="bg-neutral-900 text-orange-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
//           Feature
//         </span>
//         <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
//           Easily build{" "}
//           <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
//             your code
//           </span>
//         </h2>
//       </div>
//       <div className="flex flex-wrap mt-10 lg:mt-20">
//         {features.map((feature, index) => (
//           <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
//             <div className="flex">
//               <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
//                 {feature.icon}
//               </div>
//               <div>
//                 <h5 className="mt-1 mb-6 text-xl">{feature.text}</h5>
//                 <p className="text-md p-2 mb-20 text-neutral-500">
//                   {feature.description}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WhatIsStackItSells;

import React from "react";
import {
  FaShoppingCart,
  FaRegHandshake,
  FaAd,
  FaRegComments,
  FaStoreAlt,
  FaRegUserCircle,
} from "react-icons/fa";

// Define a type for a feature
type Feature = {
  icon: React.ReactNode;
  text: string;
  description: string;
};

// Define the features array with TypeScript types
export const features: Feature[] = [
  {
    icon: <FaShoppingCart />,
    text: "Buy and Sell",
    description:
      "Trade goods first hand or second hand. We make buying and selling easy.",
  },
  {
    icon: <FaRegHandshake />,
    text: "Render Services",
    description:
      "Offer and find services. We make it simple to connect with service providers.",
  },
  {
    icon: <FaAd />,
    text: "Advertise Products",
    description:
      "Showcase your products. We provide a platform for easy product advertising.",
  },
  {
    icon: <FaRegComments />,
    text: "Efficient and Cheap",
    description:
      "We are efficient and affordable. We help you reach a larger audience without extra cost.",
  },
  {
    icon: <FaStoreAlt />,
    text: "E-commerce Shops",
    description:
      "Expand your e-commerce reach. We provide a platform for e-commerce shops to grow.",
  },
  {
    icon: <FaRegUserCircle />,
    text: "User-Friendly",
    description:
      "Our platform is designed with users in mind. We make it easy for everyone to buy, sell, and find services.",
  },
];

// Define the FeatureSection component with TypeScript
const FeatureSection: React.FC = () => {
  return (
    <div className="relative mt-20  border-neutral-800  min-h-[800px]">
      <div className="text-center">
        <span className="bg-neutral-900 text-orange-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
          What StackItSells Can Do
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
          Discover the capabilities of{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
            StackItSells
          </span>
        </h2>
      </div>
      <div className="flex flex-wrap mt-10  lg:mt-20">
        {features.map((feature, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
            <div className="flex">
              <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
                {feature.icon}
              </div>
              <div>
                <h5 className="mt-1 mb-6 text-xl">{feature.text}</h5>
                <p className="text-md p-2 font-serif mb-20 text-neutral-400">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
