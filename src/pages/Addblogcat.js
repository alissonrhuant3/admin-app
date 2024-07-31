import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createCategorie,
  resetState,
} from "../features/bcategory/bcategorySlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Nome da categoria do blog é Requerido!"),
});

const Addblogcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newBCategory = useSelector((state) => state.bCategory);
  const { isSuccess, isError, isLoading, createdBlogCategory } = newBCategory;

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Categoria de Blog Adicionada com Sucesso!");
    }
    if (isError) {
      toast.error("Algo Deu Errado!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCategorie(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Adicionar Categoria</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Insira o nome da Categoria de Blogs"
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
            Adicionar Categoria de Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogcat;
