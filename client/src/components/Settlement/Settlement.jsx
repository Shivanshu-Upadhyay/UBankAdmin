import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Search from "../../commonComp/SearchBox/Search";
import { Link } from "react-router-dom";
import PaginationComp from "../../commonComp/Pagination/PaginationComp";
import MainTable from "../AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";

function Settlement({ authCreate, authRead, authUpdate, authDelete }) {
  const tableHeading = [
    "Final Status Super Admin",
    "Status",
    "Merchant Id",
    "Merchant Name",
    "Source",
    "Settlement Id",
    "Settlement Type",
    "Bank Name",
    "From Currency",
    "Exchange Rate",
    "Requested Amount",
    "Settlement Fee",
    "Net Amount For Settlement",
    "Settlement Amount",
    "Action",
  ];
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const [limitVal, setLimitVal] = useState(10);
  const [message, setMessage] = useState("");
  const auth = localStorage.getItem("admin");

  const ReadData = async () => {
    try {
      let formData = new FormData();
      formData.append("page", page);
      formData.append("searchItem", searchVal);
      formData.append("limit", limitVal);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/defaultSettlement`,
        formData,
        config
      );
      console.log(result.data.data);
      setMessage(result.data.message);
      setTableData(result.data.data);
      setTotalPage(Number(result.data.totalPages));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ReadData();
  }, [page, searchVal, limitVal]);

  const toggleStatus = async (id) => {
    try {
      let formData = new FormData();
      formData.append("id", id);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/toggleSettlement`,
        formData,
        config
      );
      console.log(result);
      if(result.status === 200){
        ReadData();
      }
      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      ReadData();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const TableBodyCom = () => {
    return (
      <>
        <TableBody>
          {Object.keys(tableData).length > 0 ? (
            tableData.map((item, index) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
                >
                  <TableCell align="center">
                    {item.status === 1 ? (
                      <div className="button-SETTELMENT">Approved</div>
                    ) : (
                      <div className="button-SETTELMENT-PENDING">Pendding</div>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {item.status === 0 ? (
                      <button className="btn btn-primary" onClick={()=>toggleStatus(item.id)}>Approve</button>
                    ) : (
                      <button className="btn btn-danger btn-warning" disabled>
                        Approved
                      </button>
                    )}
                  </TableCell>
                  <TableCell align="center">{item.user_id}</TableCell>
                  <TableCell align="center">{item.merchant_name}</TableCell>
                  <TableCell align="center">{item.source}</TableCell>
                  <TableCell align="center">{item.settlementId}</TableCell>
                  <TableCell align="center">{item.settlementType}</TableCell>
                  <TableCell align="center">{item.bankName}</TableCell>
                  <TableCell align="center">{item.fromCurrency}</TableCell>
                  <TableCell align="center">{item.exchangeRate}</TableCell>
                  <TableCell align="center">{item.requestedAmount}</TableCell>
                  <TableCell align="center">{item.totalCharges}</TableCell>
                  <TableCell align="center">
                    {item.net_amount_for_settlement}
                  </TableCell>
                  <TableCell align="center">{item.settlementAmount}</TableCell>
                  <TableCell align="center">
                    <div className="d-flex  align-items-center justify-content-around flex-column">
                      {authUpdate ? (
                        <Link to={`/editbankcode/${item.identification}`}>
                          <button style={{ background: "transparent" }}>
                            <img
                              src="./imges/edit.svg"
                              alt="not"
                              style={{ width: "20px", marginBottom: "10px" }}
                            />
                          </button>
                        </Link>
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={8}>
                <h4>No Data Found</h4>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </>
    );
  };
  return (
    <>
      <Box component="main" className="allcol restBody">
        <div className="row align-items-center">
          <h4 className="mb-3 headingAll">Settlement List</h4>
          <div className="col-6 mb-3">
            {/* <Search searchVal={searchVal} setSearchval={setSearchval} /> */}
          </div>
          <div className="col-3 mb-3">
            <span>Show</span>
            <select
              name="tableRow"
              className="mx-2"
              onChange={(e) => setLimitVal(e.target.value)}
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>Entries</span>
          </div>
          <div className="col-3 mb-3 text-end">
            {authCreate ? (
              <Link to="/lolo">
                <button
                  style={{
                    background: "#ff6600",
                    borderRadius: "30px",
                    color: "#fff",
                    width: "100px",
                    height: "36px",
                    cursor: "pointer",
                  }}
                >
                  Add New
                </button>
              </Link>
            ) : null}
          </div>
        </div>
        <MainTable tableHeading={tableHeading} TableBodyCom={TableBodyCom} />
        <PaginationComp
          setPage={setPage}
          page={page}
          totalPage={totalPage}
          message={message}
        />
      </Box>
    </>
  );
}

export default Settlement;
