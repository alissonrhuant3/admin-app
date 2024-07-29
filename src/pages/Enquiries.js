import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiries } from "../features/enquiry/enquirySlice";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
  }, []);
  const enquiryState = useSelector((state) => state.enquiry.enquiries);
  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      createdat: enquiryState[i].createdAt,
      status: (
        <>
          <select name="" className="form-control form-select w-100" id="">
            <option value="">Selecione</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link className="ms-3 text-danger" to="/">
            <AiFillDelete className="fs-5" />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Perguntas</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Enquiries;
