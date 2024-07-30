import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../components/CustomInput";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Multiselect from "react-widgets/Multiselect";
import { getColors } from "../features/color/colorSlice";
import "react-widgets/styles.css";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts } from "../features/product/productSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Titulo é Requerido!"),
  description: Yup.string().required("Descrição é Requerido!"),
  price: Yup.number().required("Preço é Requerido!"),
  quantity: Yup.number().required("Quantidade é Requerido!"),
  brand: Yup.string().required("Marca é Requerido!"),
  category: Yup.string().required("Categoria é Requerido!"),
});
const Addproduct = () => {
  const dispatch = useDispatch();

  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);

  const colors = [];
  colorState.forEach((i) => {
    colors.push({
      _id: i._id,
      color: i.title,
    });
  });

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  useEffect(() => {
    formik.values.color = color;
    formik.values.images = img;
  }, [color, img]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      color: "",
      category: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values))
    },
  });
  const [desc, setDesc] = useState();
  const handleDesc = (e) => {
    setDesc(e);
  };
  return (
    <div>
      <h3 className="mb-4 title">Adicionar Produto</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          action=""
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Insira o Titulo do Produto"
            name="title"
            onCh={formik.handleChange("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="mb" onBlur={formik.handleBlur("description")}>
            <ReactQuill
              placeholder="Descrição do Produto"
              theme="snow"
              value={formik.values.description}
              name="description"
              onChange={formik.handleChange("description")}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Insira o Preço do Produto"
            name="price"
            onCh={formik.handleChange("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Selecione a Marca</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Selecione a Categoria</option>
            {categoryState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <Multiselect
            dataKey="id"
            name="color"
            textField="color"
            onChange={(e) => setColor(e)}
            data={colors}
          />
          <CustomInput
            name="quantity"
            onCh={formik.handleChange("quantity")}
            val={formik.values.quantity}
            type="number"
            label="Insira a quantidade do Produto"
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white border-1 p-5 text-center">
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
          <div className="showimages d-flex flex-wrap gap-3">
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
            Adicionar Produto
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
