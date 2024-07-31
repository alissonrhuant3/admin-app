import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}/category/`);

  return response.data;
};

const createProductCategories = async (category) => {
  const response = await axios.post(`${base_url}/category/`, category, config);

  return response.data;
};

const pCategoryService = {
  getProductCategories,
  createProductCategories,
};

export default pCategoryService;
