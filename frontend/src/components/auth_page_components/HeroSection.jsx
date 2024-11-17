import React from "react";
import auth_hero from "../../assets/auth_hero.png";

const HeroSection = () => {
  return (
    <div className="w-1/2 flex flex-col justify-center items-center h-full bg-[#F8F2E8]">
      <img
        src={auth_hero}
        alt="Auth Page Hero Image"
        className="w-[75%] h-[75%] object-contain"
      />
      <h1 className="font-jakarta text-xl font-bold text-[#5F4B3A]">
        Practice beyond your reflection.
      </h1>
      <h1 className="font-jakarta text-xl font-bold text-[#5F4B3A]">
        Let AI perfect your performance.
      </h1>
    </div>
  );
};

export default HeroSection;
