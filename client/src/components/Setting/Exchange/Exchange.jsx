import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Search from "../../../commonComp/SearchBox/Search";
import { Link } from "react-router-dom";
import PaginationComp from "../../../commonComp/Pagination/PaginationComp";
import MainTable from "../../AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useStateContext } from "../../../context/ContextProvider";

function Exchange({authCreate, authRead, authUpdate, authDelete}) {
  const tableHeading = [
    "Exchange title",
    "Rate",
    "Created On",
    "Edit",
    "Delete",
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
        `${baseUrl}/defaultExchange`,
        formData,
        config
      );
      console.log(result.data)
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
    // setActive2("Exchange");
    // setToggel(true);
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

        let result = await axios.post(`${baseUrl}/deleteExchange`, formData, config);
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
                  <TableCell align="center">{item.exchange_title}</TableCell>
                  <TableCell align="center">{item.rate}</TableCell>
                  <TableCell align="center">{item.created_on}</TableCell>
                  <TableCell align="center">
                  {authUpdate? <Link to={`/UpdateExchange/${item.id}`}>
                      <button style={{ background: "transparent" }}>
                        <img
                          src="./imges/edit.svg"
                          alt="not"
                          style={{ width: "20px", marginBottom: "10px" }}
                        />
                      </button>
                    </Link>:"Not Authorized"}
                   
                  </TableCell>
                  <TableCell align="center">
                  {authDelete? <button
                      style={{ background: "transparent" }}
                      onClick={() => deleteRow(item.id)}
                    >
                      <img
                        src="./imges/delete.png"
                        alt="not"
                        style={{ width: "20px" }}
                      />
                    </button>:"Not Authorized"}
                   
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
          <h4 className="mb-3 headingAll"> Sattlement Exchange Rate  List</h4>
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
          {authCreate? <Link to="/NewExchange">
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
            </Link>:null}
           
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

export default Exchange;
