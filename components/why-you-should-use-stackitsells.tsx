import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./spinner1.css";
import "./spinner2.css";

// Updated checklistItems to reflect StackItSells advantages
import { FaShieldAlt, FaBrain, FaTools, FaStore } from "react-icons/fa";

const SpinnerOne = () => {
  return <div className="spinner"></div>;
};
const SpinnerTwo = () => {
  return (
    <div className="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
export const checklistItems = [
  {
    icon: <SpinnerOne />,
    title: "Trustworthy and Modern Platform",
    description:
      "StackItSells leverages cutting-edge technology to ensure a secure and modern marketplace for all your buying and selling needs.",
  },
  {
    icon: <SpinnerTwo />,
    title: "AI-Driven Convenience",
    description:
      "Our platform uses AI to make buying and selling easier, automating processes to save you time and enhance your experience.",
  },
  {
    icon: <FaTools />,
    title: "Technology at Your Service",
    description:
      "We harness technology to automate routine tasks, allowing you to focus on what matters most - making successful sales and purchases.",
  },
  {
    icon: <FaStore />,
    title: "A Marketplace for Everyone",
    description:
      "Whether you're looking to buy first-hand, second-hand goods or sell your products, StackItSells is the perfect place for you.",
  },
];

// Modified Workflow component to reflect StackItSells context
const Workflow = () => {
  return (
    <div className="">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        Why Choose{" "}
        <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
          StackItSells?
        </span>
      </h2>
      <div className="flex flex-wrap justify-center">
        <div className="p-2 w-full lg:w-1/2">
          <img src={"/hero-section-1.jpg"} alt="StackItSells Platform" />
        </div>
        <div className="pt-12 w-full lg:w-1/2">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex mb-12">
              <div className="text-green-400 mx-6  h-6 w-6  justify-center items-center rounded-full">
                {item.icon}
              </div>
              <div>
                <h5 className="mt-1 mb-2 sm:text-sm md:text-xl">
                  {item.title}
                </h5>
                <p className="md:text-md text-sm  text-neutral-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workflow;
