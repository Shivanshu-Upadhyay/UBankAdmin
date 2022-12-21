import React, { useState } from 'react'
import './search.css'
function Search({ setSearchval }) {
  const [search,setSearch] = useState('')

  return (
    <>
      <div className="serachbox">
        <input
          type="search"
          placeholder="Search"
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img
          src="https://www.bankconnect.online/assets/merchants/img/search.svg"
          alt=""
          className="icon"
          style={{ cursor: "pointer" }}
          onClick={()=>setSearchval(search)}
        />
      </div>
    </>
  );
}

export default Search