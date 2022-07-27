import React from 'react'
import * as XLSX from "xlsx";
function Export({xlData}) {
  const downloadExl = () => {
    console.log(xlData);
    const workSheet = XLSX.utils.json_to_sheet(xlData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Deposit");
    // Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    // Binary String
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    // Download
    XLSX.writeFile(workBook, "Transaction.xlsx");
  };
  return (
    <>
        <button className='btn btn-primary' onClick={downloadExl}>Export</button>
    </>
  )
}

export default Export