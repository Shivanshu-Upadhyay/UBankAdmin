import React from "react";
import styles from "./style.module.css";
import SearchIcon from "@mui/icons-material/Search";
function SearchItem({ searchItem, setSearchItem }) {
  return (
    <div className={styles.bankSearch}>
      <SearchIcon className="mx-2" />
      <input
        type="search"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        className={styles.inputSearch}
      />
    </div>
  );
}

export default SearchItem;
