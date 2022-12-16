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
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


function Cron(authCreate, authRead, authUpdate, authDelete) {
  const tableHeading = [
    "Gateway No",
    "Gateway Name",
    "Cron Status",
    "Gateway Type",
    "Manual Callback",
    "Additional Charges"
  ];

  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [cronStatus, setCronStatus] = useState(1);
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
        `${baseUrl}/defaultCron`,
        formData,
        config
      );
      console.log(result.data.cronStatus[0]);
      setMessage(result.data.message);
      setTableData(result.data.data);
      setTotalPage(Number(result.data.totalPages));
      setCronStatus(result.data.cronStatus[0])
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

  const toggleStatus = async (id, cron_status) => {
      try {
          let formData = new FormData();
          formData.append("id", id);
          if (cron_status === 0) {
              formData.append("cron_status", 1);
          } else {
              formData.append("cron_status", 0);
          }

          const config = {
              headers: {
              "content-type": "multipart/form-data",
              Authorization: `Bearer ${auth}`,
              },
          };

          let result = await axios.post(
              `${baseUrl}/toggleCron`,
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

  const toggleSwitch = async (cron_id, cron_status) => {
    try {
    let formData = new FormData();
    formData.append("cron_id", cron_id);
    if (cron_status === 0) {
        formData.append("cron_status", 1);
    } else {
        formData.append("cron_status", 0);
    }

    const config = {
        headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${auth}`,
        },
    };

    let result = await axios.post(
        `${baseUrl}/toggleSwitch`,
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

  const toggleON = async (id, manual_callback) => {
    try {
      let formData = new FormData();
      formData.append("id", id);
      if (manual_callback === 0) {
          formData.append("manual_callback", 1);
      } else {
          formData.append("manual_callback", 0);
      }

      const config = {
          headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
          },
      };

      let result = await axios.post(
          `${baseUrl}/toggleON`,
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
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.gateway_name}</TableCell>
                  <TableCell align="center">
                      {item.cron_status === 1 ? (
                      <button className="btn btn-success test" data-hover="Inactive" onClick={() => toggleStatus(item.id, item.cron_status)}>Active</button>
                      ) : (
                      <button className="btn btn-danger test" data-hover="Active" onClick={() => toggleStatus(item.id, item.cron_status)}>Inactive</button>
                      )}
                  </TableCell>
                  <TableCell align="center">
                    {item.type === 1 ? (
                      <h6>Payout</h6>
                      ) : (
                      <h6>Payin</h6>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {item.manual_callback === 1 ? (
                      <button className="btn btn-success test" data-hover="OFF" onClick={() => toggleON(item.id, item.manual_callback)}>ON</button>
                      ) : (
                      <button className="btn btn-danger test" data-hover="ON" onClick={() => toggleON(item.id, item.manual_callback)}>OFF</button>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`/Charges/${item.id}`}>
                      <button className="btn btn-info test" data-hover="Click" style={{color: "#fff"}}>{item.additional_charges}</button>
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
        <div className="row justify-content-between align-items-center mb-3">
            <div className="col-6">
              <h4 className="mb-3 headingAll">Manage Cron</h4>   
            </div>
            <div className="col-6">
              <div className="switchBox">
                {cronStatus.cron_status === 1 ? (
                  <>
                    <label className="content">
                      <p align="center" className="switch">Cron Status(All Gateway)</p>
                      <input type="checkbox" style={{display: "none"}} checked/>
                      <div className="toggle" onClick={() => toggleSwitch(cronStatus.id, cronStatus.cron_status)}>
                        <div className="btn"></div>
                      </div>
                    </label>
                  </>
                  ) : (
                  <>
                    <label className="content">
                      <p align="center" className="switch">Cron Status(All Gateway)</p>
                      <input type="checkbox" style={{display: "none"}} />
                      <div className="toggle" onClick={() => toggleSwitch(cronStatus.id, cronStatus.cron_status)}>
                        <div className="btn"></div>
                      </div>
                    </label>
                  </>
                )}
              </div>
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

export default Cron;
