import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getOrderByUser } from "../features/auth/authSlice";
const columns = [
  {
    title: "N/S",
    dataIndex: "key",
  },
  {
    title: "Nome do Produto",
    dataIndex: "name",
  },
  {
    title: "Marca",
    dataIndex: "brand",
  },
  {
    title: "Quantidade",
    dataIndex: "count",
  },
  {
    title: "Cor",
    dataIndex: "color",
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

const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, []);
  const orderState = useSelector((state) => state.auth.orderbyuser.products);
  
const data1 = [];
for (let i = 0; i < orderState.length; i++) {
  data1.push({
    key: i + 1,
    name: orderState[i].product.title,
    brand: orderState[i].product.brand,
    count: orderState[i].count,
    amount: `R$ ${orderState[i].product.price}`,
    color: orderState[i].product.color,
    date: new Date(orderState[i].product.createdAt).toLocaleString(),
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
      <h3 className="mb-4 title">Visualizar Pedido</h3>
      <div>
        <Table columns={columns} dataSource={data1} /> 
      </div>
    </div>
  );
};

export default ViewOrder;
