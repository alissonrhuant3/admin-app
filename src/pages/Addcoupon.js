import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createCoupon,
  getACoupon,
  resetState,
  updateACoupon,
} from "../features/coupon/couponSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  name: Yup.string().required("Nome do cupom é Requerido!"),
  expiry: Yup.date().required("Data de expiração é Requerido!"),
  discount: Yup.number().required("Porcentagem de Desconto é Requerido!"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isError,
    isLoading,
    couponName,
    couponDiscount,
    couponExpiry,
    createdCoupon,
    updatedCoupon,
  } = newCoupon;

  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [year, month, day].join("-");
  }

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      console.log("teste");
      dispatch(resetState());
    }
  }, [getCouponId]);
  
  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Cupom Adicionado com Sucesso!");
    }
    if (updatedCoupon && isSuccess) {
      toast.success("Cupom Atualizada com Sucesso!");
      navigate("/admin/coupon-list");
    }
    if (isError) {
      toast.error("Algo Deu Errado!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: changeDateFormat(couponExpiry) || "",
      discount: couponDiscount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        console.log(data.couponData);
        dispatch(updateACoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getCouponId !== undefined ? "Editar" : "Adicionar"} Cupom
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Insira o nome da Marca"
            name="name"
            onCh={formik.handleChange("name")}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            label="Insira a data de expiração"
            name="expiry"
            onCh={formik.handleChange("expiry")}
            val={formik.values.expiry}
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            label="Insira o Desconto"
            name="discount"
            onCh={formik.handleChange("discount")}
            val={formik.values.discount}
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCouponId !== undefined ? "Editar" : "Adicionar"} Cupom
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
