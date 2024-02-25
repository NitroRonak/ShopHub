import React from "react";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="container mx-auto p-4 mt-10">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="text-left pl-1">ITEMS</TableCell>
                  <TableCell className="text-left pl-1">ID</TableCell>
                  <TableCell className="text-left pl-1">USER</TableCell>
                  <TableCell className="text-left pl-1">DATA</TableCell>
                  <TableCell className="text-left pl-1">TOTAL</TableCell>
                  <TableCell className="text-left pl-1">PAID</TableCell>
                  <TableCell className="text-left pl-1">DELIVERED</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>
                      <img
                        src={order.orderItems[0].image}
                        alt={order._id}
                        className="w-[5rem] pt-4"
                      />
                    </TableCell>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>
                      {order.user ? order.user.username : "N/A"}
                    </TableCell>
                    <TableCell>
                      {order.createdAt
                        ? order.createdAt.substring(0, 10)
                        : "N/A"}
                    </TableCell>
                    <TableCell>$ {order.totalPrice}</TableCell>
                    <TableCell className="py-2">
                      {order.isPaid ? (
                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                          Completed
                        </p>
                      ) : (
                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                          Pending
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="px-2 py-2">
                      {order.isDelivered ? (
                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                          Completed
                        </p>
                      ) : (
                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                          Pending
                        </p>
                      )}
                    </TableCell>
                    <TableCell>
                      <Link to={`/order/${order._id}`}>
                        <Button variant="outlined">More</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default OrderList;
