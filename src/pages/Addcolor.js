import React from "react";
import CustomInput from "../components/CustomInput";

const Addcolor = () => {
  return (
    <div>
      <h3 className="mb-4">Adicionar Cor</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Insira o nome da cor"/>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Adicionar Cor
          </button>
        </form>
      </div>
    </div>
  )
};

export default Addcolor;
