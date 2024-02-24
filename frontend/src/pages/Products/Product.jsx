import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
// import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="flex flex-col justify-between w-fit p-2 lg:p-6 gap-4 lg:gap-2">
      <div className="self-center relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[18rem] md:w-[20rem] h-[15rem] lg:h-[18rem] object-cover rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-2">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex flex-col justify-between items-center text-base lg:text-lg">
            <div>{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-sm lg:text-base font-medium mr-2 px-2.5 py-0.5 rounded-full">
              $ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
