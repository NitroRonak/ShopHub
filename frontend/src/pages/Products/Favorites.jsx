import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favourites/favoritesSlice";
import Product from "./Product";
import { useState } from "react";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = favorites.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(favorites.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-950 gap-10 m-10 rounded-md ">
      <h1 className="font-bold mt-[3rem] AntaFont lg:text-5xl sm:text-4xl text-3xl">
        FAVORITE PRODUCTS
      </h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        {currentProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-4 w-full">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-3 py-2 bg-purple-500 text-white rounded-sm focus:outline-none"
        >
          Prev
        </button>
        <span className="text-xl font-semibold">{currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-2 bg-purple-500 text-white rounded-sm focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Favorites;
