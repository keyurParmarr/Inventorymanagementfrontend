import axios from "axios";
// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//new-create product
const createProduct = async (formdata) => {
  const resp = await axios.post("http://localhost:5000/api/products", formdata);
  return resp.data;
};
//get all products
const getProducts = async () => {
  const resp = await axios.get("http://localhost:5000/api/products/getall");
  return resp.data;
};
//delete product
const deleteProduct = async (id) => {
  const resp = await axios.delete(
    "http://localhost:5000/api/products/deleteproduct/" + id
  );
  return resp.data;
};
//get single product
const getsingleProduct = async (id) => {
  const resp = await axios.get(
    "http://localhost:5000/api/products/getsingle/" + id
  );
  return resp.data;
};
//update product
const updateProduct = async (id, formData) => {
  const resp = await axios.patch(
    "http://localhost:5000/api/products/updateproduct/" + id,
    formData
  );
  return resp.data;
};
const ProductService = {
  createProduct,
  getProducts,
  deleteProduct,
  getsingleProduct,
  updateProduct,
};
export default ProductService;
