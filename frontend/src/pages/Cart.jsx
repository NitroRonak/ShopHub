import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { MdRemoveShoppingCart } from "react-icons/md";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container mt-10 p-4">
        {cartItems.length === 0 ? (
          <div className="flex justify-center flex-col items-center gap-10 xl:mt-[15%] lg:mt-[20%] sm:mt-[25%] mt-[30%]">
            <h1 className="sm:text-3xl text-2xl AntaFont">
              Your cart is empty{" "}
              <Link to="/shop" className="text-purple-500 font-bold underline">
                Go To Shop
              </Link>
            </h1>
            <h1 className="text-9xl text-orange-500">
              <MdRemoveShoppingCart />
            </h1>
          </div>
        ) : (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 AntaFont">
              Shopping Cart
            </h1>
            <div className="grid xl:grid-cols-4  gap-3">
              <div className="w-full xl:col-span-3">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex sm:flex-row items-center mb-4 pb-2 gap-5"
                  >
                    <div className="">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="sm:w-40 w-16 object-cover rounded-sm"
                      />
                    </div>

                    <div className="flex-1">
                      <Link
                        to={`/product/${item._id}`}
                        className="text-pink-500 md:text-xl text-sm"
                      >
                        {item.name}
                      </Link>
                      <div className="mt-2 text-white">{item.brand}</div>
                      <div className="mt-2 text-white font-bold">
                        $ {item.price}
                      </div>
                    </div>

                    <div className="sm:w-24 w-16 mt-4 sm:mt-0">
                      <select
                        className="w-full p-1 border rounded text-black"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-4 sm:mt-0">
                      <button
                        className="text-red-500"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash className="ml-1 mt-0.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full mt-4 sm:mt-0">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>
                  <div className="text-2xl font-bold">
                    ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>
                  <button
                    className="bg-purple-500 mt-4 py-2 px-4 rounded-full text-lg w-full hover:bg-purple-900"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
