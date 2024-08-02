import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteABlog, getBlogs, resetState } from "../features/blog/blogSlice";
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
    title: "Titulo",
    dataIndex: "title",
  },
  {
    title: "Categoria",
    dataIndex: "category",
  },
  {
    title: "Ações",
    dataIndex: "action",
  },
];

const Bloglist = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");
  const dispatch = useDispatch();
  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);

  const deletedBlog = useSelector((state) => state.blog);
  const { isSuccess, isError, isLoading, message } = deletedBlog;

  useEffect(() => {
    if (message === "deleteSuccess") {
      toast.success("Blog Deletado com Sucesso!");
      dispatch(resetState());
    }
    if (isError) {
      toast.error("Algo Deu Errado!");
      dispatch(resetState());
    }
  }, [isSuccess, isError, isLoading]);

  const getBlogState = useSelector((state) => state.blog.blogs);
  const data1 = [];
  for (let i = 0; i < getBlogState.length; i++) {
    data1.push({
      key: i + 1,
      title: getBlogState[i].title,
      category: getBlogState[i].category,
      action: (
        <>
          <Link to={`/admin/blog/${getBlogState[i]._id}`} className="">
            <BiEdit className="fs-5" />
          </Link>
          <button
            className="ms-3 text-danger bg-transparent border-0"
            onClick={() => showModal(getBlogState[i]._id)}
            to="/"
          >
            <AiFillDelete className="fs-5" />
          </button>
        </>
      ),
    });
  }

  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Lista de Blogs</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlog(blogId);
        }}
        title="Você tem certeza que deseja deletar esse blog?"
      />
    </div>
  );
};

export default Bloglist;
