import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCoupon, resetState } from "../features/coupon/couponSlice";

let schema = Yup.object().shape({
  name: Yup.string().required("Nome do cupom é Requerido!"),
  expiry: Yup.date().required("Data de expiração é Requerido!"),
  discount: Yup.number().required("Porcentagem de Desconto é Requerido!"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const newCoupon = useSelector((state) => state.coupon);
  const { isSuccess, isError, isLoading, createdCoupon } = newCoupon;

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Cupom Adicionado com Sucesso!");
    }
    if (isError) {
      toast.error("Algo Deu Errado!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCoupon(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Adicionar Cupom</h3>
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
            Adicionar Cupom
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
