import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import MainTable from "../../AdminTable/MainTable";
import Search from "../../../commonComp/SearchBox/Search";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { Box } from "@mui/system";
import { toast } from "react-toastify";
import PaginationComp from "../../../commonComp/Pagination/PaginationComp";
import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";

function PayoutMerchants({ authCreate, authRead, authUpdate, authDelete }) {
  const tableHeading = [
    "AC.Type ",
    "Bank",
    "Payout Id",
    "Customer Payout Id",
    "Merchant",
    "Status",
    "Message",
    "UTR",
    "Change Status",
    "Trx Type",
    "Payee",
    "Credit Acc",
    "IFSC",
    "Amount",
    "Remark",
    "Payout Charge",
    "GST Charge",
    "Bank Charge",
    "Wallet Deduct",
    "Currency",
    "Create",
    "Update",
    "B Response",
    "B Enc Req Res",
  ];

  const [user_id, setUser_id] = useState("");
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
      formData.append("searchText", searchVal);
      formData.append("limit", limitVal);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/defaultPM`, formData, config);

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

  const toggleStatus = async (id, status) => {
    try {
      let formData = new FormData();
      console.log(id, status);
      formData.append("id", id);
      if (status === "SUCCESS") {
        formData.append("status", "SUCCESS");
      } else if (status === "FAILURE") {
        formData.append("status", "FAILURE");
      } else {
        formData.append("status", "PENDING");
      }

      let result = await axios.post(`${baseUrl}/toggleStatusPM`, formData);
      ReadData();

      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
                    {item.trx_from === 0 ? <h6>Nodel</h6> : <h6>Current</h6>}
                  </TableCell>
                  <TableCell align="center">
                    {item.payout_bank === 1 ? (
                      <h6>ICICI</h6>
                    ) : item.payout_bank === 2 ? (
                      <h6>Gate8</h6>
                    ) : (
                      <h6>YT Pay</h6>
                    )}
                  </TableCell>
                  <TableCell align="center">{item.uniqueid}</TableCell>
                  <TableCell align="center">{item.CustomerPayoutId}</TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.status}</TableCell>
                  <TableCell align="center">{item.response}</TableCell>
                  <TableCell align="center">{item.utrnumber}</TableCell>
                  <TableCell align="center">
                    <div className="d-flex  align-items-center justify-content-around">
                      <button
                        className="btn btn-success"
                        style={{ boxShadow: "none" }}
                        onClick={() => toggleStatus(item.id, "SUCCESS")}
                      >
                        S
                      </button>
                      <button
                        className="btn btn-danger mx-2"
                        style={{ boxShadow: "none" }}
                        onClick={() => toggleStatus(item.id, "FAILURE")}
                      >
                        F
                      </button>
                      <button
                        className="btn btn-warning"
                        style={{ boxShadow: "none" }}
                        onClick={() => toggleStatus(item.id, "PENDING")}
                      >
                        P
                      </button>
                    </div>
                  </TableCell>
                  <TableCell align="center">{item.trx_type}</TableCell>
                  <TableCell align="center">{item.payee_name}</TableCell>
                  <TableCell align="center">{item.creditacc}</TableCell>
                  <TableCell align="center">{item.ifsc}</TableCell>
                  <TableCell align="center">{item.amount}</TableCell>
                  <TableCell align="center">{item.remark}</TableCell>
                  <TableCell align="center">{item.akonto_charge}</TableCell>
                  <TableCell align="center">{item.gst_amount}</TableCell>
                  <TableCell align="center">{item.bank_charges}</TableCell>
                  <TableCell align="center">{item.wallet_deduct}</TableCell>
                  <TableCell align="center">{item.currency}</TableCell>
                  <TableCell align="center">{item.created_on}</TableCell>
                  <TableCell align="center">{item.updated_on}</TableCell>
                  <TableCell>{item.bank_full_response}</TableCell>
                  <TableCell>{item.bank_encrypted_request_response}</TableCell>
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
          <div className="col-9 mb-3">
            <h4 className="mb-3 headingAll">Merchants Payouts</h4>
          </div>
          <div className="col-3 mb-3 text-end">
            {authCreate ? (
              <Link to="/CreatePayout">
                <button className="btn btn-success">Add Payout</button>
              </Link>
            ) : null}
          </div>
        </div>

        <div className="row align-items-center text-end">
          <div className="col-3 mb-3">
            <button className="btn btn-success">Export</button>
          </div>
          <div className="col-3 mb-3"></div>
          <div className="col-3 mb-3">
            <Form.Select
              aria-label="Default select example"
              style={{ marginTop: "10px", boxShadow: "none" }}
              value={user_id}
              onChange={(e) => setUser_id(e.target.value)}
            >
              <option value="-1">Filter By Merchant</option>
              {tableData.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <div className="col-3 mb-3"></div>
        </div>

        <div className="row align-items-center">
          <div className="col-6 mb-3">
            <Search searchVal={searchVal} setSearchval={setSearchval} />
          </div>
          <div className="col-3 mb-3">
            <span style={{ marginLeft: "25px" }}>Show</span>
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

export default PayoutMerchants;
