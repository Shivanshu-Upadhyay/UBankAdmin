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
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import FilterDate from "../../../commonComp/filterDate/FilterDate";


function Limit(authCreate, authRead, authUpdate, authDelete) {
  const tableHeading = [
    "Merchant ID",
    "Merchant Name",
    "Gateway",
    "Currency",
    "Min",
    "Max",
    "Status",
    "Created On",
    "Updated On",
    "Action"
  ];

  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const [limitVal, setLimitVal] = useState(10);
  const { setActive, setActive2, setToggel } = useStateContext();
  const [message, setMessage] = useState("");

  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");


  const auth = localStorage.getItem("admin");

  const ReadData = async () => {
    try {
      let formData = new FormData();
      formData.append("page", page);
      formData.append("searchItem", searchVal);
      formData.append("limit", limitVal);
      formData.append("to", from );
      formData.append("from", to );

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/defaultSetLimitmodule`,
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
  }, [page, searchVal, limitVal, to, from]);

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
              `${baseUrl}/toggleLimit`,
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
                    <TableCell align="center">{item.user_id}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.gateway_name}</TableCell>
                    <TableCell align="center">{item.currency}</TableCell>
                    <TableCell align="center">{item.min}</TableCell>
                    <TableCell align="center">{item.max}</TableCell>
                    <TableCell align="center">
                        {item.status === 1 ? (
                        <button className="btn btn-success" onClick={() => toggleStatus(item.id, item.status)}>Enable</button>
                        ) : (
                        <button className="btn btn-secondary" onClick={() => toggleStatus(item.id, item.status)}>Disable</button>
                        )}
                    </TableCell>
                    <TableCell align="center">{item.created_on}</TableCell>
                    <TableCell align="center">{item.updated_on}</TableCell>
                    <TableCell align="center">
                        <Link to={`/EditLimit/${item.id}`}>
                            <button style={{ background: "transparent" }} >
                                <img  src="./imges/edit.svg" alt="edit" style={{ width: "20px" }} />
                            </button>
                        </Link>
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
          <h4 className="mb-3 headingAll">Manage Amount Limit</h4>
          <div className="row justify-content-between align-items-center mb-5">
            <div className="col-6">
              <FilterDate setTo={setTo} setFrom={setFrom} />
            </div>
            <div className="col-6">
              <Link to={"/AddLimit"}>
                <button className="btn btn-success" style={{marginLeft: "auto", display: "block"}}>Set Limt</button>
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

export default Limit;
