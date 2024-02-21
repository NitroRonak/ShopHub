import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      // Replace backslashes with forward slashes in the URL
      const url = res.image.replace(/\\/g, "/");
      console.log(url);
      toast.success(res.message);
      setImage(url);
      setImageUrl(url);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[5rem] h-fit">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/2 w-2/4 flex flex-col gap-2">
          <h2 className="text-3xl font-bold mb-4 AntaFont">Create Product</h2>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div>
            <label className="border border-purple-500 text-purple-500 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div>
            <div className="mb-4">
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-input p-4 rounded-sm w-full outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Price</label>
              <input
                type="number"
                placeholder="Enter price"
                className="form-input p-4 rounded-sm w-full outline-none"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Quantity</label>
              <input
                type="number"
                placeholder="Enter quantity"
                className="form-input p-4 rounded-sm w-full outline-none"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Brand</label>
              <input
                type="text"
                placeholder="Enter brand"
                className="form-input p-4 rounded-sm w-full outline-none"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Description</label>
              <textarea
                type="text"
                placeholder="Enter description"
                className="form-input p-4 rounded-sm w-full outline-none"
                value={description}
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Count In Stock</label>
              <input
                type="text"
                placeholder="Enter stock"
                className="form-input p-4 rounded-sm w-full outline-none"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Category</label>
              <select
                placeholder="Choose Category"
                className="form-input p-4 rounded-sm w-full outline-none text-black"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((c) => (
                  <option
                    key={c._id}
                    value={c._id}
                    className="bg-gray-700 text-white"
                  >
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-purple-600 hover:bg-purple-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
