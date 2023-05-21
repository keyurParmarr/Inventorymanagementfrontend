import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductList } from "../../COMPONENTS/PRODUCTDATA/ProductList";
import { RedirectLoggedOut } from "../../COMPONENTS/REDIRECTHOOK/RedirectLoggedOut";
import { ProductSummary } from "../../COMPONENTS/PRODUCTDATA/ProductSummary";
import { getallProducts } from "../../REDUX/PRODUCT/ProductSlice";
import { selectIsloggedIn } from "../../REDUX/AUTH/Auth";

export const Dashboard = () => {
  RedirectLoggedOut("/login");
  const dispatch = useDispatch();
  const isloggedin = useSelector(selectIsloggedIn);
  const { message, isError, isLoading, products } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (isloggedin === true) {
      dispatch(getallProducts());
    }
    if (isError) {
      console.log(message);
    }
  }, [isloggedin]);
  return (
    <div>
      <h2>Dashboard</h2>
      <ProductSummary products={products} />
      <ProductList products={products} isloading={isLoading} />
    </div>
  );
};
