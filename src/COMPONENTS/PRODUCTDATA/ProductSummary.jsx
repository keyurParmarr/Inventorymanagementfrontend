import React, { useEffect } from "react";
import "./ProductSummary.style.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { Infobox } from "../INFOBOX/Infobox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_CATEGORY,
  CALC_OUT_OF_STOCK,
  CALC_STORE_VALUE,
  selectCategory,
  selectOutofStockValue,
  selectTotalStoreValue,
} from "../../REDUX/PRODUCT/ProductSlice";
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outofStockIcon = <BsCartX size={40} color="#fff" />;
export const ProductSummary = ({ products }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outofStock = useSelector(selectOutofStockValue);
  const category = useSelector(selectCategory);
  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUT_OF_STOCK(products));
    dispatch(CALC_CATEGORY(products));
  }, []);
  const formatNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="product-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        <Infobox
          icon={productIcon}
          title={"Total Products"}
          count={products.length}
          bgColor="card1"
        />
        <Infobox
          icon={earningIcon}
          title={"Total Store Value"}
          count={`$${formatNumbers(totalStoreValue.toFixed(2))}`}
          bgColor="card2"
        />
        <Infobox
          icon={outofStockIcon}
          title={"Out of Stock"}
          count={outofStock}
          bgColor="card3"
        />
        <Infobox
          icon={categoryIcon}
          title={"All Categories"}
          count={category.length}
          bgColor="card4"
        />
      </div>
    </div>
  );
};
