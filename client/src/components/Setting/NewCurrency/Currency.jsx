import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Search from "../../../commonComp/SearchBox/Search";
import PaginationComp from "../../../commonComp/Pagination/PaginationComp";
import MainTable from "../../AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useStateContext } from "../../../context/ContextProvider";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


function Currency(authCreate, authRead, authUpdate, authDelete) {
  const tableHeading = [
    "Country",
    "Currency",
    "Currency Code",
    "Status",
    "Created On",
    "Updated On",
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
        `${baseUrl}/defaultNewCurrency`,
        formData,
        config
      );
      console.log(result.data);
      setMessage(result.data.message);
      setTableData(result.data.data);
      setTotalPage(Number(result.data.totalPages));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ReadData();
    // setActive(14);
    // setActive2("All UPI");
    // setToggel(true);
  }, [page, searchVal, limitVal]);

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
                `${baseUrl}/toggleCurrency`,
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
    
            let result = await axios.post(`${baseUrl}/deleteNewCurrency`, formData, config);
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
          }
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
                  <TableCell align="center">{item.country}</TableCell>
                  <TableCell align="center">{item.currency}</TableCell>
                  <TableCell align="center">{item.currency_code}</TableCell>
                  <TableCell align="center">
                    {item.status === 1 ? (
                        <button className="btn btn-success" onClick={() => toggleStatus(item.id, item.status)}>Active</button>
                    ) : (
                        <button className="btn btn-danger" onClick={() => toggleStatus(item.id, item.status)}>Inactive</button>
                    )}
                  </TableCell>
                  <TableCell align="center">{item.created_on}</TableCell>
                  <TableCell align="center">{item.updated_on}</TableCell>
                  <TableCell align="center">
                    <div className="d-flex  align-items-center justify-content-around flex-column">
                        <button style={{ background: "transparent" }} onClick={() => deleteRow(item.id)} >
                          <img
                            src="./imges/delete.png"
                            alt="not"
                            style={{ width: "20px" }} />
                        </button>
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
          <div className="row justify-content-between align-items-center mb-3">
            <div className="col-6">
                <h4 className="headingAll">Currency</h4>
            </div>
            <div className="col-6">
              <Link to='/NewCurrencyAdd'>
                <button className="btn btn-success" style={{marginLeft: "auto", display: "block"}}>Add Currency</button>
              </Link>
            </div>
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

export default Currency;
