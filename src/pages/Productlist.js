import React, { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "N/S",
    dataIndex: "key",
  },
  {
    title: "Titulo",
    dataIndex: "title",
    sorter: (a,b) => a.title.length - b.title.length,
  },
  {
    title: "Marca",
    dataIndex: "brand",
    sorter: (a,b) => a.brand.length - b.brand.length,
  },
  {
    title: "Categoria",
    dataIndex: "category",
    sorter: (a,b) => a.category.length - b.category.length,
  },
  {
    title: "Cor",
    dataIndex: "color",
  },
  {
    title: "Preço",
    dataIndex: "price",
    sorter: (a,b) => a.price.length - b.price.length,
  },
  {
    title: "Vendidos",
    dataIndex: "sold",
  },
  {
    title: "Avaliações",
    dataIndex: "totalrating",
  },
  {
    title: "Ações",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: productState[i].color,
      price: `R$ ${productState[i].price}`,
      sold: productState[i].sold,
      totalrating: productState[i].totalrating,
      action: (
        <>
          <Link to="/" className="">
            <BiEdit className="fs-5"/>
          </Link>
          <Link className="ms-3 text-danger" to="/">
            <AiFillDelete className="fs-5"/>
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Produtos</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Productlist;
