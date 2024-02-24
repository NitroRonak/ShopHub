import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";

const AllProducts = () => {
  const { data: products, isLoading, isError, refetch } = useAllProductsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);

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
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold mb-4 AntaFont mt-10">
        All Products ({products.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <Link
            key={product._id}
            to={`/admin/product/update/${product._id}`}
            className="mb-4 overflow-hidden border border-gray-700 rounded-lg p-4 transition duration-300 transform hover:border-purple-700 hover:border-2 flex flex-col justify-between"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 object-cover mb-4 mx-auto"
            />
            <div className="flex justify-between items-center mb-2">
              <h5 className="text-lg font-semibold">{product?.name}</h5>
              <p className="text-blue-400 text-xs">
                {moment(product.createdAt).format("MMMM Do YYYY")}
              </p>
            </div>

            <p className="text-gray-500 text-sm mb-4">
              {product?.description?.substring(0, 50)}...
            </p>

            <div className="flex justify-between items-center">
              <Link
                to={`/admin/product/update/${product._id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-pink-800"
              >
                Update Product
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
              <p className="text-lg font-semibold">$ {product?.price}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
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

export default AllProducts;
