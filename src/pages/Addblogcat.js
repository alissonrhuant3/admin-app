import React from "react";
import CustomInput from "../components/CustomInput";

const Addblogcat = () => {
  return (
    <div>
      <h3 className="mb-4 title">Adicionar Categoria</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Insira o nome da Categoria de Blogs"/>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Adicionar Categoria de Blog
          </button>
        </form>
      </div>
    </div>
  )
};

export default Addblogcat;
