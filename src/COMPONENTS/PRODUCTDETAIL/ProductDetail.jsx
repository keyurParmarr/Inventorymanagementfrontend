import React from "react";
import "./ProductDetail.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { RedirectLoggedOut } from "../REDIRECTHOOK/RedirectLoggedOut";
import { useParams } from "react-router-dom";
import { selectIsloggedIn } from "../../REDUX/AUTH/Auth";
import { useEffect } from "react";
import { getsingleProducts } from "../../REDUX/PRODUCT/ProductSlice";
import Card from "../CARD/Card";
import { SpinnerImg } from "../LOADER/Loader";
import DOMPurify from "dompurify";
export const ProductDetail = () => {
  RedirectLoggedOut("/login");
  const dispatch = useDispatch();
  const { id } = useParams();
  const isloggedin = useSelector(selectIsloggedIn);
  const { message, isError, isloading, product } = useSelector(
    (state) => state.product
  );
  const StockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };
  useEffect(() => {
    if (isloggedin === true) {
      dispatch(getsingleProducts(id));
    }
    if (isError) {
      console.log(message);
    }
  }, [isError, message, dispatch, isloading, isloggedin]);

  return (
    <div className="product-detail">
      <h3 className="--mt">Product Detail</h3>
      <Card cardClass="card">
        {isloading && <SpinnerImg />}
        {product && (
          <div className="detail">
            <Card cardClass="group">
              {product?.image ? (
                <img
                  src={product.image.filePath}
                  alt={product.image.fileName}
                />
              ) : (
                <p>No Image Set for this Product</p>
              )}
            </Card>
            <h4>Product Availability: {StockStatus(product.quantity)}</h4>{" "}
            <hr />
            <h4>
              <span className="badge">Name:</span>&nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr;SKU:</b>&nbsp;
              {product.sku}
            </p>
            <p>
              <b>&rarr;Category:</b>&nbsp;
              {product.category}
            </p>
            <p>
              <b>&rarr;Price:</b>&nbsp;
              {product.price}
            </p>
            <p>
              <b>&rarr;Quantity in Stock:</b>&nbsp;
              {product.quantity}
            </p>
            <p>
              <b>&rarr;Total Value in Stock:</b>&nbsp;
              {"$"}
              {product.price * product.quantity}
            </p>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">
              Created On:{product.createdAt.toLocaleString("en-IN")}
            </code>
            <code className="--color-dark">
              Updated At:{product.updatedAt.toLocaleString("en-IN")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};
