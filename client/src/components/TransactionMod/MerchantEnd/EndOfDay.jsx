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
import Form from 'react-bootstrap/Form';

function EndOfDay({ authCreate, authRead, authUpdate, authDelete }) {
  const tableHeading = [
    "Merchant Name",
    "Mid",
    "Date",
    "No of trx",
    "Deposit",
    "Deposit Fee",
    "GST Charges",
    "Commission",
    "Balance",
    "RR Amount",
    "Update In Wallet",
    "Wallet Status",
    "Created",
    "Updated",
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
      formData.append("searchText", searchVal);
      formData.append("limit", limitVal);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/defaultMEOD`, formData, config);
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

      formData.append("status",1)

      formData.append("id", id);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/toggleStatusMEOD`,
        formData,
        config
      );
      console.log(result);
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
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.users_id}</TableCell>
                  <TableCell align="center">{item.date}</TableCell>
                  <TableCell align="center">{item.no_of_trx}</TableCell>
                  <TableCell align="center">{item.deposit}</TableCell>
                  <TableCell align="center">{item.deposit_fee}</TableCell>
                  <TableCell align="center">{item.gst_charges}</TableCell>
                  <TableCell align="center">{item.commission}</TableCell>
                  <TableCell align="center">{item.balance}</TableCell>
                  <TableCell align="center">{item.rr_amount}</TableCell>
                  <TableCell align="center">{item.update_in_wallet}</TableCell>

                  <TableCell align="center">
                    {item.wallet_status === 0 ? (
                      <button className="btn btn-danger"
                      onClick={() => toggleStatus(item.id)}
                      >Update</button>
                    ) : (
                      <button className="btn btn-success"
                      >Updated</button>
                    )}
                  </TableCell>
                  <TableCell align="center">{item.created_on}</TableCell>
                  <TableCell align="center">{item.updated_on}</TableCell>
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
      <h4 className="mb-3 headingAll">End Of Day Transactions</h4>
        <div className="row align-items-center">
          <button className="btn btn-success" style={{
            width: "100px",
            marginLeft: "auto",
            marginRight: "20px"
            }}>Export</button>
          
          <Form.Select
            aria-label="Default select example"
            style={{ 
              marginTop: "10px", 
              boxShadow: "none", 
              width: "200px", 
              display: "flex", 
              marginLeft: "20px" }}
          >
          <option value="-1">Select Merchant</option>
            {
              tableData.map((item,index)=>{
                return(
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                );
              })
            }
          </Form.Select>
        </div>
        <div className="row align-items-center">
          <div className="col-6 mb-3">
            <Search searchVal={searchVal} setSearchval={setSearchval} />
          </div>
          <div className="col-3 mb-3">
            <span style={{marginLeft: "25px"}}>Show</span>
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

export default EndOfDay;
