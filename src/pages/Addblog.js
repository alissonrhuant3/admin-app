import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "../features/upload/uploadSlice";
import { toast } from "react-toastify";
import { getCategories } from "../features/bcategory/bcategorySlice";
import {
  createBlog,
  getABlog,
  resetState,
  updateABlog,
} from "../features/blog/blogSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Titulo é Requerido!"),
  description: Yup.string().required("Descrição é Requerido!"),
  category: Yup.string().required("Categoria é Requerido!"),
});

const Addblog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];
  
  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state) => state.bCategory.bCategories);
  const blogState = useSelector((state) => state.blog);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBlog,
    updatedBlog,
    blogName,
    blogDescription,
    blogCategory,
    blogImages,
  } = blogState;
  
  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);

  useEffect(() => {
    dispatch(resetState())
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Adicionado com Sucesso!");
    }
    if (updatedBlog && isSuccess) {
      toast.success("Blog Atualizado com Sucesso!");
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error("Algo Deu Errado!");
    }
  }, [isSuccess, isError, isLoading]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  
  useEffect(() => {
    formik.values.images = img;
  }, [blogImages]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName ||  "",
      description: blogDescription ||  "",
      category: blogCategory || "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateABlog(data));
        dispatch(resetState());
      } else {
        dispatch(createBlog(values));
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
        {getBlogId !== undefined ? "Editar" : "Adicionar"} Blog
      </h3>

      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              label="Insira o Titulo do Blog"
              name="title"
              onCh={formik.handleChange("title")}
              val={formik.values.title}
            />
          </div>
          <div className="error mb-3">
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            className="form-control py-3"
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
          >
            <option value="">Selecione a Categoria do Blog</option>
            {bCatState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error mb-3">
            {formik.touched.category && formik.errors.category}
          </div>
          <ReactQuill
            theme="snow"
            value={formik.values.description}
            name="description"
            onChange={formik.handleChange("description")}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <div className="bg-white border-1 p-5 text-center mt-3">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages mt-3 d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {     
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(deleteImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBlogId !== undefined ? "Editar" : "Adicionar"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
