import React from "react";
import CustomInput from "../components/CustomInput";

const Addcat = () => {
  return (
    <div>
      <h3 className="mb-4 title">Adcionar Categoria</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Insira o nome da categoria de Produto"/>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Adicionar Categoria de Produto
          </button>
        </form>
      </div>
    </div>
  )
};

export default Addcat;
