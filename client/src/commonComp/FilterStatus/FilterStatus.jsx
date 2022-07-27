import React from "react";

function FilterStatus() {
  return (
    <div>
      <select className="form-select">
        <option selected>Selet By Status</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
  );
}

export default FilterStatus;
