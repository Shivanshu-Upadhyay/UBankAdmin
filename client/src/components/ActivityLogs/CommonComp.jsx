import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Search from "../../commonComp/SearchBox/Search";
import PaginationComp from "../../commonComp/Pagination/PaginationComp";
import MainTable from "../AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import FilterMerchant from "../../commonComp/FilterMerchant/FilterMerchant";
import Export from "../../commonComp/Export/Export";
import FilterDate from "../../commonComp/filterDate/FilterDate";
function CommonComp({ tableHeading, apiEndPoint, name }) {
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchVal, setSearchval] = useState("");
  const [limitVal, setLimitVal] = useState(10);
  const [message, setMessage] = useState("");
  const [merchantSelect, setMerchantSelect] = useState();
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const auth = localStorage.getItem("admin");
console.log(to,from);
  const ReadData = async () => {
    try {
      let formData = new FormData();
      formData.append("page", page);
      formData.append("searchItem", searchVal);
      formData.append("limit", limitVal);
      if(to && from){
        formData.append("to", to)
        formData.append("from", from)
      }
     
      
      merchantSelect && formData.append("merchantName", merchantSelect);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/${apiEndPoint}`,
        formData,
        config
      );
      console.log(result);

      setMessage(result.data.message);
      setTableData(result.data.data);
      setTotalPage(Number(result.data.totalPages));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ReadData();
  }, [page, searchVal, limitVal, merchantSelect,to,from]);

  const TableBodyCom = () => {
    return (
      <>
        <TableBody>
          {Object.keys(tableData).length > 0 ? (
            tableData.map((item, index) => {
              return (
                <>
                  {name === "Wallet" ? (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={index}
                    >
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">
                        {item.current_wallet}
                      </TableCell>
                      <TableCell align="center">
                        {item.update_wallet_tot}
                      </TableCell>
                      <TableCell align="center">{item.Action}</TableCell>
                      <TableCell align="center">{item.effective_amt}</TableCell>
                      <TableCell align="center">{item.order_id}</TableCell>
                      <TableCell align="center">{item.byAdmin}</TableCell>
                      <TableCell align="center">{item.created_on}</TableCell>
                    </TableRow>
                  ) : (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={index}
                    >
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.url}</TableCell>
                      <TableCell align="center">{item.timeDeff}min</TableCell>
                      <TableCell align="center">{item.created_on}</TableCell>
                      <TableCell align="center">{item.updated_on}</TableCell>
                    </TableRow>
                  )}
                </>
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
        <div className="row align-items-center justify-content-around">
          <h4 className="mb-3 headingAll"> {name} Log List</h4>
          {name === "Wallet" ? (
            <>
              <div className="col-8 mb-3 row align-content-center justify-content-between"></div>
              <div className="col-4 mb-3 row align-content-center justify-content-between">
                <div className="col-6">
                  <Export xlData={tableData} />
                </div>
                <div className="col-6">
                  <FilterDate setTo={setTo} setFrom={setFrom}/>
                </div>
              </div>
            </>
          ) : null}

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
          <div className="col-3 mb-3">
            <FilterMerchant
              setMerchantSelect={setMerchantSelect}
              adminfilter={name === "Admin" ? true : false}
            />
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

export default CommonComp;
