import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getallProducts,
  getsingleProducts,
  selectProduct,
  selectisLoading,
  updateProduct,
} from "../../REDUX/PRODUCT/ProductSlice";
import { useEffect } from "react";
import { useState } from "react";
import { Productform } from "../../COMPONENTS/PRODUCTFORM/Productform";
import { Loader } from "../../COMPONENTS/LOADER/Loader";

export const Editproduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isloading = useSelector(selectisLoading);
  const productEdit = useSelector(selectProduct);
  const [product, setProduct] = useState(productEdit);
  const [productimg, setProductimg] = useState("");
  const [imgpreview, setimgpreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getsingleProducts(id));
  }, []);
  useEffect(() => {
    setProduct(productEdit);
    setimgpreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );
    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, []);
  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product?.name);
    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("price", product?.price);
    formData.append("description", product?.description);
    if (productimg) {
      formData.append("image", productimg);
    }
    await dispatch(updateProduct({ id, formData }));
    await dispatch(getallProducts());
    navigate("/dashboard");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    setProductimg(e.target.files[0]);
    setimgpreview(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div>
      {isloading && <Loader />}
      <h3 className="--mt">Edit Product</h3>
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
