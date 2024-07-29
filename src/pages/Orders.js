import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getOrders } from "../features/auth/authSlice";
const columns = [
  {
    title: "N/S",
    dataIndex: "key",
  },
  {
    title: "Nome",
    dataIndex: "name",
  },
  {
    title: "Produtos",
    dataIndex: "product",
  },
  {
    title: "Valor",
    dataIndex: "amount",
  },
  {
    title: "Data",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders);
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i,
      name: orderState[i].orderBy.firstname,
      product: orderState[i].products.map((i, j) => {
        return (
          <>
            <ul key={j}>
              <li>{i.product.title}</li>
            </ul>
          </>
        );
      }),
      amount: `R$ ${orderState[i].paymentIntent.amount}`,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      action: (
        <>
          <Link to="/" className="">
            <BiEdit className="fs-5" />
          </Link>
          <Link className="ms-3 text-danger" to="/">
            <AiFillDelete className="fs-5" />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Pedidos</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Orders;
