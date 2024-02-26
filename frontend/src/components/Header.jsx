import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import React, { useEffect, useRef } from "react";
import ProductCarousel from "../pages/Products/ProductCarousel";
import gsap from "gsap";
const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();
  const headerRef = useRef(null);

  useEffect(() => {
    // Entrance animation for the entire header
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power2.inOut",
    });

    // Entrance animation for specific elements
    gsap.from(".AntaFont", {
      opacity: 0,
      x: -20,
      duration: 1,
      ease: "power2.inOut",
      delay: 0.5,
    });

    gsap.from(".header-description", {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.inOut",
      delay: 1,
    });

    // Jumping animation for each character in "Hub"
    gsap.from(".jumping-letter", {
      y: 20,
      ease: "elastic.out(1, 0.3)",
      duration: 1,
      stagger: 0.2,
      repeat: -1, // Infinite repeat
      yoyo: true, // Alternates back and forth
      delay: 0.5,
    });
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <div
      className="grid lg:grid-cols-2 shadow-lg rounded-[59px] h-fit m-10 lg:gap-10 gap-36 bg-gray-950"
      ref={headerRef}
    >
      <div className="p-10">
        <h1 className="text-6xl sm:text-6xl  lg:text-7xl text-white font-semibold AntaFont">
          Shop
          <span className="text-purple-500 underline">
            {["H", "u", "b"].map((char, index) => (
              <span key={index} className="jumping-letter inline-block">
                {char}
              </span>
            ))}
          </span>
        </h1>
        <div className="w-full h-24 mt-20 flex flex-col gap-5 items-start">
          <h2 className="text-2xl self-center">
            Where Style Meets Convenience,
          </h2>
          <h2 className="text-purple-500 text-2xl self-center">
            Your One-Stop Destination for Trendy Finds!
          </h2>
          <p className="text-gray-200 header-description">
            Discover a world of seamless shopping at ShopHub, where every click
            brings you closer to the latest trends and must-have essentials.
            Welcome to ShopHub your fashion-forward haven!
          </p>
        </div>
        <div>
          <p></p>
        </div>
      </div>
      <div className="mx-auto lg:mx-0">
        <ProductCarousel />
      </div>
    </div>
  );
};

export default Header;
