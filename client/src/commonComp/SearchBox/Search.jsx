import React from 'react'
import './search.css'
function Search({ searchVal,setSearchval }) {
  

  return (
    <>
      <div className="serachbox">
        <input
          type="search"
          placeholder="Search"
          className="search"
          value={searchVal}
          onChange={(e) => setSearchval(e.target.value)}
        />
        <img
          src="https://www.bankconnect.online/assets/merchants/img/search.svg"
          alt=""
          className="icon"
          style={{ cursor: "pointer" }}
        />
      </div>
    </>
  );
}

export default Search