import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favourites/favoritesSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-950 gap-10">
      <h1 className="font-bold mt-[3rem] AntaFont lg:text-5xl sm:text-4xl text-3xl">
        FAVORITE PRODUCTS
      </h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
