import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const ProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);
  

  console.log(productData);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);

  // hook
  const navigate = useNavigate();

  // Fetch categories using RTK Query
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();

  // Define the update product mutation
  const [updateProduct] = useUpdateProductMutation();

  // Define the delete product mutation
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully");
      setImage(res.image);
    } catch (err) {
      toast.success("Item added successfully");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      // Update product using the RTK Query mutation
      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error, {
          autoClose: 2000,
        });
      } else {
        toast.success(`Product successfully updated`);
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`);
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[5rem] h-fit">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/2 w-2/4 flex flex-col gap-2">
          <h2 className="text-3xl font-bold mb-4 AntaFont">Create Product</h2>

          {image && (
            <div className="text-center">
              <img
                src={image}
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
          <button
            onClick={handleDelete}
            className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-red-600 hover:bg-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
