import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteACoupon, getCoupons, resetState } from "../features/coupon/couponSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";
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

  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState("");
  const dispatch = useDispatch();

  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  }, []);

  const deletedCoupon= useSelector((state) => state.coupon);
  const { isSuccess, isError, isLoading, message } = deletedCoupon;

  useEffect(() => {
    if (message === "deleteSuccess") {
      toast.success("Cupom Deletado com Sucesso!");
      dispatch(resetState());
    }
    if (isError) {
      toast.error("Algo Deu Errado!");
      dispatch(resetState());
    }
  }, [isSuccess, isError, isLoading]);

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
          <Link to={`/admin/coupon/${couponState[i]._id}`} className="">
            <BiEdit className="fs-5" />
          </Link>
          <button
            className="ms-3 text-danger bg-transparent border-0"
            onClick={() => showModal(couponState[i]._id)}
            to="/"
          >
            <AiFillDelete className="fs-5" />
          </button>
        </>
      ),
    });
  }

  const deleteCoupon = (e) => {
    dispatch(deleteACoupon(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Cupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCoupon(couponId);
        }}
        title="Você tem certeza que deseja deletar essa marca?"
      />
    </div>
  );
};

export default Couponlist;
