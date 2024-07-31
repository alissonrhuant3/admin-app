import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCoupons } from "../features/coupon/couponSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
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
    title: "Desconto",
    dataIndex: "discount",
  },
  {
    title: "Criação",
    dataIndex: "createdAt",
  },
  {
    title: "Expiração",
    dataIndex: "expiry",
  },
  {
    title: "Atualizado",
    dataIndex: "updatedAt",
  },
  {
    title: "Ações",
    dataIndex: "action",
  },
];

const Couponlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoupons());
  }, []);
  const couponState = useSelector((state) => state.coupon.coupons);
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i + 1,
      name: couponState[i].name,
      discount: `${couponState[i].discount}%`,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
      createdAt: new Date(couponState[i].createdAt).toLocaleString(),
      updatedAt:new Date(couponState[i].updatedAt).toLocaleString(),
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
      <h3 className="mb-4 title">Cupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Couponlist;
