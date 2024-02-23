"use client";
import Image from "next/image";
import React, { useState } from "react";

const HomeBanner = () => {
  const [bgColor, setBgColor] = useState({
    from: "from-sky-200",
    to: "to-sky-300",
  });

  // State to hold text color
  const [textColor, setTextColor] = useState("text-white");

  // Function to randomly change background and text colors
  const changeColors = () => {
    const bgColors = [
      { from: "from-purple-200", to: "to-purple-300" },
      { from: "from-green-200", to: "to-green-300" },
      { from: "from-pink-200", to: "to-pink-300" },
      { from: "from-indigo-200", to: "to-indigo-300" },
    ];
    const textColors = [
      "text-white",
      "text-yellow-400",
      "text-red-400",
      "text-blue-400",
    ];

    // Randomly select new colors
    const newBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
    const newTextColor =
      textColors[Math.floor(Math.random() * textColors.length)];

    setBgColor(newBgColor);
    setTextColor(newTextColor);
  };

  return (
    <div
      className={`relative bg-gradient-to-r ${bgColor.from} ${bgColor.to} mb-8`}
    >
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 mb:mb-0 text-center">
          <h1 className={`text-4xl md:text-6xl font-bold ${textColor} mb-4`}>
            Summer Sale
          </h1>
          <p className={`text-lg md:text-xl ${textColor} mb-2`}>
            Enjoy a discount on selected items
          </p>
          <p className={`text-2xl md:text-5xl font-bold ${textColor}`}>
            GET 50% OFF BY USING COUPON CODE 'THAKUR'
          </p>
          <button
            className="mt-4 px-6 py-2 bg-white text-black rounded hover:bg-gray-100 transition"
            onClick={changeColors}
          >
            Change Colors
          </button>
        </div>
        <div className="w-1/3 relative aspect-video">
          <Image
            src="/banner-image1.png"
            alt="banner-image"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
