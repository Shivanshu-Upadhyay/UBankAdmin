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
import FilterDate from "../../commonComp/filterDate/FilterDate";


function SubMerchant({ authCreate, authRead, authUpdate, authDelete }) {
  const tableHeading = [
    "Name",
    "Key",
    "Salt",
    "MID",
    "Merchant IDs",
    "Child Percentage",
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
  const [message, setMessage] = useState("");
  const [loading,setLoading]= useState(true)
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

      let result = await axios.post(`${baseUrl}/defaultSubmerchant`, formData, config);
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
                  <TableCell align="center">{item.sec_key}</TableCell>
                  <TableCell align="center">{item.salt}</TableCell>
                  <TableCell align="center">{item.mid}</TableCell>
                  <TableCell align="center">{item.merchant_ids}</TableCell>
                  <TableCell align="center">{item.percentage}</TableCell>
                  <TableCell align="center">
                    {item.status === 1 ? (
                      <button className="btn btn-success">Enable</button>
                    ) : (
                      <button className="btn btn-danger">Disable</button>
                    )}
                  </TableCell>
                  <TableCell align="center">{item.created_on}</TableCell>
                  <TableCell align="center">{item.updated_on}</TableCell>
                  <TableCell>
                    <div className="d-flex  align-items-center justify-content-around flex-column">
                      <Link to={`/UpdateSubmerchant/${item.id}`}>
                        <button style={{ background: "transparent" }}>
                          <img
                            src="./imges/edit.svg"
                            alt="not"
                            style={{ width: "20px", marginBottom: "10px" }}
                          />
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
          <h4 className="mb-3 headingAll">Manage Sub Merchant</h4>
          <div className="col-6 mb-3">
            <FilterDate />
          </div>
          <div className="col-6 mb-3 text-end">
            <Link to="/NewSubmerchant">
              <button
                style={{
                  background: "#ff6600",
                  borderRadius: "30px",
                  color: "#fff",
                  width: "150px",
                  height: "40px",
                  cursor: "pointer",
                }}
              >
                Sub Merchant
              </button>
            </Link>
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

export default SubMerchant;
