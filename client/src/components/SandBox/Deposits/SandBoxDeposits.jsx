import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PaginationComp from "../../../commonComp/Pagination/PaginationComp";
import MainTable from "../../AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useStateContext } from "../../../context/ContextProvider";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import FilterDate from "../../../commonComp/filterDate/FilterDate";
import Loader from "../../Loader/Loader";
import Export from "../../../commonComp/Export/Export";
import * as XLSX from "xlsx";


function SandBoxDeposits(authCreate, authRead, authUpdate, authDelete) {
  const tableHeading = [
    "Merchant Name",
    "Mid",
    "MOrder No",
    "Order No",
    "Transaction ID",
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
    "Net Amount",
    "Status",
    "Created On",
    "Action",
  ];

  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const [limitVal, setLimitVal] = useState(10);
  const { setActive, setActive2, setToggel } = useStateContext();
  const [message, setMessage] = useState("");
  const auth = localStorage.getItem("admin");
  const [loading,setLoading]=useState(true);

  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");

  const ReadData = async () => {
    try {
      let formData = new FormData();
      formData.append("page", page);
      formData.append("searchItem", searchVal);
      formData.append("limit", limitVal);
      formData.append("to",from );
      formData.append("from",to );

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/defaultSandboxDeposits`,
        formData,
        config
      );
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
    // setActive(14);
    // setActive2("All UPI");
    // setToggel(true);
  }, [page, searchVal, limitVal, to,from]);

  const downloadExl = () => {
    const workSheet = XLSX.utils.json_to_sheet(tableData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Deposit");
    // Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    // Binary String
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    // Download
    XLSX.writeFile(workBook, "SandBoxDeposits.xlsx");
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
                  <TableCell align="center">{item.our_bank_charge_gst}</TableCell>
                  <TableCell align="center">{item.our_bank_charge}</TableCell>
                  <TableCell align="center">{item.rolling_reverse_amount}</TableCell>
                  <TableCell align="center">{item.settle_amount}</TableCell>
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
                  <TableCell align="center">{item.created_on}</TableCell>
                  <TableCell align="center">
                    <div className="d-flex  align-items-center justify-content-around flex-column">
                        <Link to={`/ViewSandboxDeposits/${item.invoice_id}`}>
                          <button style={{ background: "transparent" }}>
                            <RemoveRedEyeIcon sx={{ color: "#ffc965" }} />
                          </button>
                        </Link>
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
          <h4 className="mb-3 headingAll">Manage Sandbox Deposit</h4>
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
          <div className="col-3 mb-3">
            <select className="form-select">
              <option selected>Select By Status</option>
              <option value="0">Failed</option>
              <option value="1">Success</option>
              <option value="2">Pending</option>
              <option value="4">Refund</option>
              <option value="5">Chargeback</option>
            </select>
          </div>
          <div className="col-3 mb-3">
            <FilterDate setTo={setTo} setFrom={setFrom} />
          </div>
          <div className="col-3 mb-3">
            <button className="btn btn-success" onClick={downloadExl} style={{marginLeft: "auto", display: "block"}}>Download Report</button>
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

const FilterField = ({ xlData }) => {
  return (
    <>
      <Export xlData={xlData} />
    </>
  );
};

export default SandBoxDeposits;