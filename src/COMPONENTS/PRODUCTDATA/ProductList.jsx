import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../LOADER/Loader";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./Productlist.style.scss";
import { Search } from "../SEARCH/Search";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from "../../REDUX/PRODUCT/FilterSlice";
import ReactPaginate from "react-paginate";
import {
  deleteProducts,
  getallProducts,
} from "../../REDUX/PRODUCT/ProductSlice";
import { Link } from "react-router-dom";
export const ProductList = ({ products, isloading }) => {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredPoducts);
  // const productData = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const shortText = (text, n) => {
    if (text.length > n) {
      const smalltext = text.substring(0, n).concat("...");
      return smalltext;
    }
    return text;
  };
  const delProduct = async (id) => {
    await dispatch(deleteProducts(id));
    await dispatch(getallProducts());
  };
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to Delete Product",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ search, products }));
  }, [search, products]);
  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3> Inventory Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>
        {isloading && <SpinnerImg />}
        <div className="table">
          {isloading && products.length === 0 ? (
            <p>-- No Products Found, Please add a Product...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => {
                  const { _id, name, category, price, quantity } = item;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        {"$"}
                        {price}
                      </td>
                      <td>{quantity}</td>
                      <td>
                        {"$"}
                        {quantity * price}
                      </td>
                      <td className="icons">
                        <Link to={`/product-detail/${_id}`}>
                          <span>
                            <AiOutlineEye size={25} color={"purple"} />
                          </span>
                        </Link>
                        <Link to={`/edit-product/${_id}`}>
                          <span>
                            <FaEdit size={25} color={"green"} />
                          </span>
                        </Link>

                        <span>
                          <FaTrashAlt
                            size={25}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};
