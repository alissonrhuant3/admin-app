import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, deleteAProductCategory, resetState } from "../features/pcategory/pcategorySlice";
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
    dataIndex: "title",
  },
  {
    title: "Ações",
    dataIndex: "action",
  },
];

const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(getCategories());
  }, []);

  const deletedPCategory = useSelector((state) => state.pCategory);
  const { isSuccess, isError, isLoading, message } = deletedPCategory;

  useEffect(() => {
    if (message === "deleteSuccess") {
      toast.success("Marca Deletada com Sucesso!");
      dispatch(resetState());
    }
    if (isError) {
      toast.error("Algo Deu Errado!");
      dispatch(resetState());
    }
  }, [isSuccess, isError, isLoading]);

  const pCatStat = useSelector((state) => state.pCategory.pCategories);
  const data1 = [];
  for (let i = 0; i < pCatStat.length ; i++) {
    data1.push({
      key: i,
      title: pCatStat[i].title,
      action: (
        <>
          <Link to={`/admin/category/${pCatStat[i]._id}`} className="">
            <BiEdit className="fs-5" />
          </Link>
          <button
            className="ms-3 text-danger bg-transparent border-0"
            onClick={() => showModal(pCatStat[i]._id)}
            to="/"
          >
            <AiFillDelete className="fs-5" />
          </button>
        </>
      ),
    });
  }

  const deleteProductCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Categorias de Produtos</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProductCategory(pCatId);
        }}
        title="Você tem certeza que deseja deletar essa categoria de produto?"
      />
    </div>
  );
};

export default Categorylist;
