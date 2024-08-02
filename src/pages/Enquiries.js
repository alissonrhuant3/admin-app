import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAEnquiry,
  getEnquiries,
  resetState,
  updateAEnquiry,
} from "../features/enquiry/enquirySlice";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";
const columns = [
  {
    title: "N/S",
    dataIndex: "key",
  },
  {
    title: "Nome",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Telefone",
    dataIndex: "mobile",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Data",
    dataIndex: "createdat",
  },
  {
    title: "Ações",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState("");
  const dispatch = useDispatch();
  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, []);

  const deleteEnquiry = useSelector((state) => state.enquiry);
  const { isSuccess, isError, isLoading, message, updatedEnquiry } =
    deleteEnquiry;

  useEffect(() => {
    if (message === "deleteSuccess") {
      toast.success("Pergunta Deletada com Sucesso!");
      dispatch(resetState());
    }
    if (updatedEnquiry && isSuccess) {
      toast.success("Status Atualizado com Sucesso!");
    }
    if (isError) {
      toast.error("Algo Deu Errado!");
      dispatch(resetState());
    }
  }, [isSuccess, isError, isLoading]);

  const enquiryState = useSelector((state) => state.enquiry.enquiries);
  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      createdat: new Date(enquiryState[i].createdAt).toLocaleDateString(),
      status: (
        <>
          <select
            defaultValue={
              enquiryState[i].status ? enquiryState[i].status : "Enviado"
            }
            className="form-control form-select"
            name=""
            id=""
            onChange={(e) =>
              setEnquiryStatus(e.target.value, enquiryState[i]._id)
            }
          >
            <option value="Enviado">Enviado</option>
            <option value="Contatado">Contatado</option>
            <option value="Em Progresso">Em Progresso</option>
            <option value="Resolvido">Resolvido</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link className="ms-3" to={`/admin/enquiries/${enquiryState[i]._id}`}>
            <AiOutlineEye className="fs-5" />
          </Link>
          <button
            className="ms-3 text-danger bg-transparent border-0"
            onClick={() => showModal(enquiryState[i]._id)}
            to="/"
          >
            <AiFillDelete className="fs-5" />
          </button>
        </>
      ),
    });
  }

  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(resetState());
      dispatch(getEnquiries());
    }, 100);
  };

  const deleteEnq = (e) => {
    dispatch(deleteAEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Perguntas</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteEnq(enqId);
        }}
        title="Você tem certeza que deseja deletar essa Pergunta?"
      />
    </div>
  );
};

export default Enquiries;
