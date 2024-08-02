import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Table } from "antd";
import { deleteABlogCategory, getCategories, resetState } from "../features/bcategory/bcategorySlice";
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

const Blogcatlist = () => {
  const [open, setOpen] = useState(false);
  const [bCatId, setbCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setbCatId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(getCategories());
  }, []);

  const deletedBCategory = useSelector((state) => state.bCategory);
  const { isSuccess, isError, isLoading, message } = deletedBCategory;

  useEffect(() => {
    if (message === "deleteSuccess") {
      toast.success("Categoria de Blog Deletada com Sucesso!");
      dispatch(resetState());
    }
    if (isError) {
      toast.error("Algo Deu Errado!");
      dispatch(resetState());
    }
  }, [isSuccess, isError, isLoading]);

  const bCatStat = useSelector((state) => state.bCategory.bCategories);
  const data1 = [];
  for (let i = 0; i < bCatStat.length; i++) {
    data1.push({
      key: i,
      title: bCatStat[i].title,
      action: (
        <>
          <Link to={`/admin/blog-category/${bCatStat[i]._id}`} className="">
            <BiEdit className="fs-5" />
          </Link>
          <button
            className="ms-3 text-danger bg-transparent border-0"
            onClick={() => showModal(bCatStat[i]._id)}
            to="/"
          >
            <AiFillDelete className="fs-5" />
          </button>
        </>
      ),
    });
  }

  const deleteBlogCategory = (e) => {
    dispatch(deleteABlogCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Blog Categorias</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlogCategory(bCatId);
        }}
        title="Você tem certeza que deseja deletar essa categoria de blog?"
      />
    </div>
  );
};

export default Blogcatlist;
