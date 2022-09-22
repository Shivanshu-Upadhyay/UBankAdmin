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
import Loader from "../Loader/Loader";

function BankCodeAkonto({ authCreate, authRead, authUpdate, authDelete }) {
  const tableHeading = ["Type", "Title", "Code", "Status", "Action"];
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const [limitVal, setLimitVal] = useState(10);
  const [message, setMessage] = useState("");
  const [loading,setLoading]=useState(true)
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
        `${baseUrl}/readBankCodeAkonto`,
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
  }, [page, searchVal, limitVal]);

  const deleteRow = async (id) => {
    try {
      let answer = window.confirm("Are you sure you want to delete this row?");
      if (answer) {
        let formData = new FormData();
        formData.append("id", id);

        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
          },
        };

        let result = await axios.post(
          `${baseUrl}/deleteBankCodeAkonto`,
          formData,
          config
        );
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
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleStatus = async (id, status) => {
    try {
      let formData = new FormData();
      formData.append("id", id);
      if (status === 0) {
        formData.append("status", 1);
      } else {
        formData.append("status", 0);
      }

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/toggleBankCodeAkonto`,
        formData,
        config
      );
      
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
     
    } catch (error) {
      console.log(error);
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
                  <TableCell align="center">
                    {item.type === 0
                      ? "NetBanking"
                      : item.type === 1
                      ? "Wallet"
                      : item.type === 2
                      ? "UPI"
                      : item.type === 3
                      ? "Credit Card"
                      : item.type === 4
                      ? "Debit Card"
                      : "QR code"}
                  </TableCell>
                  <TableCell align="center">{item.title}</TableCell>
                  <TableCell align="center">{item.code}</TableCell>
                  <TableCell align="center">
                    {item.status === 1 ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => toggleStatus(item.id, item.status)}
                      >
                        Enable
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        onClick={() => toggleStatus(item.id, item.status)}
                      >
                        
                        Disable
                      </button>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="d-flex  align-items-center justify-content-around flex-column">
                      {authUpdate ? (
                        <Link to={`/editbankcodeakonto/${item.id}`}>
                          <button style={{ background: "transparent" }}>
                            <img
                              src="./imges/edit.svg"
                              alt="not"
                              style={{ width: "20px", marginBottom: "10px" }}
                            />
                          </button>
                        </Link>
                      ) : null}

                      {authDelete ? (
                        <button
                          style={{ background: "transparent" }}
                          onClick={() => deleteRow(item.id)}
                        >
                          <img
                            src="./imges/delete.png"
                            alt="not"
                            style={{ width: "20px" }}
                          />
                        </button>
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
          <h4 className="mb-3 headingAll">Manage Bankcode Akonto List</h4>
          <div className="col-6 mb-3">
            <Search searchVal={searchVal} setSearchval={setSearchval} />
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
              <Link to="/newbankcodeakonto">
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

export default BankCodeAkonto;
