import Image from "next/image";
import React from "react";

const HomeBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-red-400 to-pink-200 mb-8">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-evenly">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3 sm:mb-4">
            Summer Sale
          </h1>
          <p className="text-md sm:text-lg md:text-xl text-white mb-2">
            Enjoy a discount on selected items
          </p>
          <p className="text-xl sm:text-2xl md:text-5xl text-yellow-400 font-bold">
            GET 50% OFF BY USING COUPON CODE &apos;THAKUR&apos;
          </p>
        </div>
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 relative">
          <Image
            src="/banner-image1.png"
            alt="banner-image"
            layout="responsive"
            width={500}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
