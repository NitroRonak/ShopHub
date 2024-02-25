import { Link, useParams } from "react-router-dom";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Message from "../components/Message";
import Product from "./Products/Product";
import gsap from "gsap";
import { useEffect, useRef } from "react";
const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetTopProductsQuery({ keyword });
  const specialProductsRef = useRef(null);
  useEffect(() => {
    if (specialProductsRef.current) {
      // Entrance animation for the "Special Products" section
      gsap.from(specialProductsRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.inOut",
      });

      // Fade-in animation for individual products
      gsap.from(".product-card", {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }
  }, [data]);
  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div
            className="flex flex-col items-center lg:flex-row justify-around lg:items-center w-full"
            ref={specialProductsRef}
          >
            <h1 className="mt-6 text-3xl lg:text-5xl text-gray-400">
              Top Products
            </h1>
            <Link
              to="/shop"
              className="mt-4 lg:mt-0 bg-purple-600 font-bold rounded-full py-2 px-8 lg:py-2.5 lg:px-10 text-sm lg:text-base"
            >
              Shop
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 m-6 bg-gray-950 rounded-[59px]">
            {data?.map((product) => (
              <div key={product._id} className="product-card">
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
