import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}/blogcategory/`);

  return response.data;
};

const createBlogCategories = async (category) => {
  const response = await axios.post(`${base_url}/blogcategory/`, category, config);

  return response.data;
};

const deleteBlogCategories = async (id) => {
  const response = await axios.delete(`${base_url}/blogcategory/${id}`, config);

  return response.data;
};

const bCategoryService = {
  getBlogCategories,
  createBlogCategories,
  deleteBlogCategories
};

export default bCategoryService;
