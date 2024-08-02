import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAEnquiry,
  resetState,
  updateAEnquiry,
} from "../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";

const ViewEnq = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEnqId = location.pathname.split("/")[3];
  const enqState = useSelector((state) => state.enquiry);
  const { enqName, enqMobile, enqEmail, enqComment, enqStatus, isSuccess, updatedEnquiry, isError } = enqState;

  useEffect(() => {
    if(updatedEnquiry && isSuccess) {
      toast.success("Status Atualizado com Sucesso!");
    }
    if (isError) {
      toast.error("Algo Deu Errado!");
    }
  },[updatedEnquiry, isSuccess, isError])

  useEffect(() => {
    dispatch(getAEnquiry(getEnqId));
  }, [getEnqId]);

  const goBack = () => {
    navigate(-1);
  };

  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(resetState());
      dispatch(getAEnquiry(getEnqId));
    }, 100);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">Visualizar Pergunta</h3>
        <button
          className="bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Voltar
        </button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex flex-column gap-3 rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Nome:</h6>
          <p className="mb-0">{enqName}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Telefone:</h6>
          <p className="mb-0">
            <a href={`tel:+55${enqMobile}`}>{enqMobile}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">
            <a href={`mailto:${enqEmail}`}>{enqEmail}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comentário:</h6>
          <p className="mb-0">{enqComment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Estado:</h6>
          <p className="mb-0">{enqStatus}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mudar Estado:</h6>
          <div>
            <select
              defaultValue={enqStatus ? enqStatus : "Enviado"}
              className="form-control form-select"
              name=""
              id=""
              onChange={(e) => setEnquiryStatus(e.target.value, getEnqId)}
            >
              <option value="Enviado">Enviado</option>
              <option value="Contatado">Contatado</option>
              <option value="Em Progresso">Em Progresso</option>
              <option value="Resolvido">Resolvido</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEnq;
