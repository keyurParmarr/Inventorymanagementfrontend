import React from "react";
import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";
export const Search = ({ value, onChange }) => {
  return (
    <div className={styles.search}>
      <BiSearch size={25} className={styles.icon} />
      <input
        type="text"
        placeholder="Search Products"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
