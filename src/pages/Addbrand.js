import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createBrand,
  getABrand,
  resetState,
  updateABrand,
} from "../features/brand/brandSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Nome da marca é Requerido!"),
});

const Addbrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const { isSuccess, isError, isLoading, createdBrand, getBrand, updatedBrand } = newBrand;
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Marca Adicionado com Sucesso!");
    }
    if(updatedBrand && isSuccess) {
      toast.success("Marca Atualizada com Sucesso!");
      navigate("/admin/list-brand")
    }
    if (isError) {
      toast.error("Algo Deu Errado!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: getBrand || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateABrand(data));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
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
        {getBrandId !== undefined ? "Editar" : "Adicionar"} Marca
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Insira o nome da Marca"
            name="title"
            onCh={formik.handleChange("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
           {getBrandId !== undefined ? "Editar" : "Adicionar"} Marca
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
