import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Search from "../../../commonComp/SearchBox/Search";
import { Link } from "react-router-dom";
import PaginationComp from "../../../commonComp/Pagination/PaginationComp";
import MainTable from "../../../components/AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import FilterDate from "../../../commonComp/filterDate/FilterDate";
import Export from "../../../commonComp/Export/Export";
import FilterMerchant from "../../../commonComp/FilterMerchant/FilterMerchant";
import FilterStatus from "../../../commonComp/FilterStatus/FilterStatus";
import Loader from "../../Loader/Loader";
function MerchantTrans({ authCreate, authRead, authUpdate, authDelete }) {
  const tableHeading = [
    "Merchant Name",
    "Mid",
    "Details",
    "Action",
    "Status",
    "MOrder No",
    "Order No",
    "Transaction Id",
    "Pay By",
    "Payment Status",
    "Currency",
    "Total Amount",
    "Tax Amount",
    "Payin Charges",
    "GST Amount",
    "Bank GST Amount",
    "Bank Charges",
    "RR Amount",
    "Net Amt",
    "Create",
  ];

  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchDate, setSearchDate] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [merchantSelect, setMerchantSelect] = useState("");
  const [searchVal, setSearchval] = useState("");
  const [limitVal, setLimitVal] = useState(10);
  const [message, setMessage] = useState("");
  const [loading,setLoading] =useState(true)
  const auth = localStorage.getItem("admin");
   

  const ReadData = async () => {
    try {
      let formData = new FormData();
      formData.append("page", page);
      formData.append("searchText", searchVal);
      formData.append("searchDate",searchDate)
      formData.append("limit", limitVal);
      formData.append("to",from );
      formData.append("from",to );
      formData.append("merchantName", merchantSelect);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/defaultMT`, formData, config);
      console.log(result.data);
      setMessage(result.data.message);
      setTableData(result.data.data);
      setTotalPage(Number(result.data.totalPages));
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ReadData();
  }, [page, searchVal, limitVal,to,from,merchantSelect]);

  const changeStatus = async (id) => {
    try {
      let formData = new FormData();
      formData.append("status", 1);
      formData.append("id", id);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/toggleStatusMT`,
        formData,
        config
      );
      setMessage(result.data.message);
      ReadData();
    } catch (err) {
      console.log(err);
    }
  };

if(loading){
  return <Loader />
}

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
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.user_id}</TableCell>
                  <TableCell align="center">
                    {authRead ? (
                      <Link to={`/ViewMerchant/${item.invoice_id}`}>
                        <button style={{ background: "transparent" }}>
                          <img
                            src="./imges/eye.png"
                            alt="not"
                            style={{ width: "25px" }}
                          />
                        </button>
                      </Link>
                    ) : null}
                  </TableCell>
                  <TableCell align="center">
                    {item.status === 1}
                    <button
                      className="enableStatus"
                      onClick={() => changeStatus(item.invoice_id)}
                    >
                      Success
                    </button>
                  </TableCell>
                  <TableCell align="center">
                    {item.status === 0 ? (
                      <h6>Failed</h6>
                    ) : item.status === 1 ? (
                      <h6>Success</h6>
                    ) : item.status === 2 ? (
                      <h6>Waiting</h6>
                    ) : item.status === 3 ? (
                      <h6>Pending</h6>
                    ) : item.status === 4 ? (
                      <h6>Refund</h6>
                    ) : (
                      <h6>ChargeBack</h6>
                    )}
                  </TableCell>
                  <TableCell align="center">{item.txn_id}</TableCell>
                  <TableCell align="center">{item.order_no}</TableCell>
                  <TableCell align="center">{item.transaction_id}</TableCell>
                  <TableCell align="center">{item.payment_type}</TableCell>
                  <TableCell align="center">{item.payment_status}</TableCell>
                  <TableCell align="center">{item.ammount_type}</TableCell>
                  <TableCell align="center">{item.ammount}</TableCell>
                  <TableCell align="center">{item.tax_amt}</TableCell>
                  <TableCell align="center">{item.payin_charges}</TableCell>
                  <TableCell align="center">{item.gst_charges}</TableCell>
                  <TableCell align="center">
                    {item.our_bank_charge_gst}
                  </TableCell>
                  <TableCell align="center">{item.our_bank_charge}</TableCell>
                  <TableCell align="center">
                    {item.rolling_reverse_amount}
                  </TableCell>
                  <TableCell align="center">{item.settle_amount}</TableCell>
                  <TableCell align="center">{item.created_on}</TableCell>
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
        <div className="row d-flex justify-content-center align-items-lg-center">
          <h4 className="mb-3 headingAll">Merchants Transaction</h4>
          <FilterField  setTo={setTo}  setFrom={setFrom} setMerchantSelect={setMerchantSelect} xlData={tableData}/>
          <div className="col-6 mb-3 d-flex justify-content-center align-items-center">
            <Search searchVal={searchVal} setSearchval={setSearchval} /> <input type="date" value={searchDate} onChange={(e)=>setSearchDate(e.target.value)}  className="mx-2 p-2" />
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
          <div className="col-3 mb-3 text-end">
            {authCreate ? (
              <Link to="/NewMerchant">
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
                  Add Payin
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

const FilterField = ({ setFrom, setTo,setMerchantSelect,xlData }) => {
  return (
    <>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-9">
          <div className="row justify-content-between align-items-center mb-5">
            <div className="col-2">
              <Export xlData={xlData} />
            </div>
            <div className="col-3">
              <FilterDate setTo={setTo} setFrom={setFrom} />
            </div>
            <div className="col-3">
              <FilterMerchant setMerchantSelect={setMerchantSelect} />
            </div>
            <div className="col-3">
              <FilterStatus />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MerchantTrans;
