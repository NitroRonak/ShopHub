import React from "react";
import "./Navigation.css";
import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineMenu,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import FavoriteCount from "../../components/FavoriteCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      setShowSidebar(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="fixed top-5 left-5 z-50">
        <AiOutlineMenu
          className="text-white cursor-pointer hover:text-purple-500"
          size={40}
          onClick={toggleSidebar}
        />
      </div>

      {showSidebar && (
        <div className="sidebarFont flex z-20 top-0 justify-between left-0 h-screen fixed flex-col w-64 bg-black text-white p-4">
          <div className="flex flex-col gap-10">
            {/* Links */}
            <NavLink
              to="/"
              className="flex mt-20 gap-2 justify-start items-center hover:text-purple-500"
              onClick={toggleSidebar}
            >
              <AiOutlineHome size={26} />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/shop"
              className="flex my-2 gap-2  justify-start items-center hover:text-purple-500"
              onClick={toggleSidebar}
            >
              <AiOutlineShopping size={26} />
              <span>Shop</span>
            </NavLink>
            <NavLink
              to="/cart"
              className="my-2 hover:text-purple-500 relative"
              onClick={toggleSidebar}
            >
              <div className="flex gap-2 items-center">
                <AiOutlineShoppingCart size={26} />
                <span>Cart</span>
              </div>

              <div className="absolute top-[-8px] left-4 text-white  font-bold">
                {cartItems.length > 0 ? (
                  <span className=" bg-red-500 w-5 h-5 rounded-full flex justify-center items-center">
                    {cartItems.length}
                  </span>
                ) : null}
              </div>
            </NavLink>
            <NavLink
              to="/favorite"
              className="flex my-2 gap-2 justify-start items-center hover:text-purple-500 relative"
              onClick={toggleSidebar}
            >
              <FaHeart size={26} />
              <span>Favorite</span>
              <FavoriteCount />
            </NavLink>
          </div>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-gray-800 focus:outline-none"
            >
              {userInfo ? (
                <span className="text-white">{userInfo.username}</span>
              ) : (
                <></>
              )}

              {userInfo && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 ${
                    dropdownOpen ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                  />
                </svg>
              )}
            </button>

            {dropdownOpen && userInfo && (
              <ul
                className={`absolute right-0 mt-2 mr-14 space-y-2 bg-gray-950 text-white ${
                  !userInfo.isAdmin ? "-top-20" : "-top-80"
                } `}
              >
                {userInfo.isAdmin && (
                  <>
                    <li>
                      <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-green-500" : "text-white"
                          } block px-4 py-2 hover:bg-[#2E2D2D] `
                        }
                        onClick={toggleSidebar}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/productlist"
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-green-500" : "text-white"
                          } block px-4 py-2 hover:bg-[#2E2D2D] `
                        }
                        onClick={toggleSidebar}
                      >
                        Create Product
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/allproductslist"
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-green-500" : "text-white"
                          } block px-4 py-2 hover:bg-[#2E2D2D] `
                        }
                        onClick={toggleSidebar}
                      >
                        All Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/categorylist"
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-green-500" : "text-white"
                          } block px-4 py-2 hover:bg-[#2E2D2D] `
                        }
                        onClick={toggleSidebar}
                      >
                        Category
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/orderlist"
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-green-500" : "text-white"
                          } block px-4 py-2 hover:bg-[#2E2D2D] `
                        }
                        onClick={toggleSidebar}
                      >
                        Orders
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/userlist"
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-green-500" : "text-white"
                          } block px-4 py-2 hover:bg-[#2E2D2D] `
                        }
                        onClick={toggleSidebar}
                      >
                        Users
                      </NavLink>
                    </li>
                  </>
                )}

                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-green-500" : "text-white"
                      } block px-4 py-2 hover:bg-[#2E2D2D] `
                    }
                    onClick={toggleSidebar}
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-green-500" : "text-white"
                      } block px-4 py-2 hover:bg-[#2E2D2D] `
                    }
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>

          {/* Login and Register */}
          {!userInfo && (
            <ul>
              <li>
                <NavLink
                  to="/login"
                  className="flex items-center transition-transform transform hover:translate-x-2"
                  onClick={toggleSidebar}
                >
                  <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
                  <span className="mt-[3rem]">Login</span>{" "}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="flex items-center transition-transform transform hover:translate-x-2"
                  onClick={toggleSidebar}
                >
                  <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
                  <span className="mt-[3rem]">Register</span>{" "}
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Navigation;
