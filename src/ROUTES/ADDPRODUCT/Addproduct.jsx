import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../COMPONENTS/LOADER/Loader";
import { Productform } from "../../COMPONENTS/PRODUCTFORM/Productform";
import {
  createProduct,
  selectisLoading,
} from "../../REDUX/PRODUCT/ProductSlice";
export const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    name: "",
    category: "",
    price: "",
    quantity: "",
  };
  const [product, setProduct] = useState(initialState);
  const [productimg, setProductimg] = useState("");
  const [imgpreview, setimgpreview] = useState(null);
  const [description, setDescription] = useState("");
  const isLoading = useSelector(selectisLoading);
  const { name, category, price, quantity } = product;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    setProductimg(e.target.files[0]);
    setimgpreview(URL.createObjectURL(e.target.files[0]));
  };
  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };
  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateSKU(category));
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", productimg);
    await dispatch(createProduct(formData));
    navigate("/dashboard");
  };
  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>
      <Productform
        product={product}
        productimg={productimg}
        imagePreview={imgpreview}
        description={description}
        setDescription={setDescription}
        handleImageChange={handleImageChange}
        handleInputChange={handleInputChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};
