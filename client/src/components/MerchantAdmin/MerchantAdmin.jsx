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
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CachedIcon from "@mui/icons-material/Cached";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";


function MerchantAdmin({ authCreate, authRead, authUpdate, authDelete }) {
  const tableHeading = [
    "Password",
    "Wallet",
    "Payin chrg",
    "Payout chrg",
    "Cash Payout chrg",
    "Crypto Payout chrg",
    "Rolling reverse chrg",
    "Merchants Number",
    "Name",
    "Secret Key",
    "Secret IV",
    "Test Secret Key",
    "Test Secret IV",
    "Settle",
    "CARD",
    "UPI",
    "NetBanking",
    "Wallet",
    "QR Code",
    "Payout Gateway",
    "Status",
    "Web Payment",
    "Action",
    "Created",
    "Image",
  ];
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [payoutGateWay, setPayoutGateWay] = useState([]);
  const [urlData, setUrlData] = useState([]);
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
        `${baseUrl}/merchantAdmin`,
        formData,
        config
      );
      console.log(result.data);
      setMessage(result.data.message);
      setPaymentData(result.data.paymentResult);
      setUrlData(result.data.urlResult);
      setPayoutGateWay(result.data.payoutResult);

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
    console.log(id);
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
          `${baseUrl}/deleteMerchantAdmin`,
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
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateSelectKey = async (id, name, value) => {
    try {
      let formData = new FormData();
      formData.append("id", id);
      formData.append("secretName", name);
      formData.append("value", value);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/updateSelectKey`,
        formData,
        config
      );
      console.log(result);
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
                    {item.password ? (
                      <button className="btn btn-primary">Resend</button>
                    ) : (
                      <button className="btn btn-success">Send</button>
                    )}
                    {item.verification_token ? (
                      <button className="btn btn-info my-2" disabled>
                        Verified
                      </button>
                    ) : (
                      <button
                        className="btn btn-secondary my-2"
                        onClick={() => updateSelectKey(item.id, "verify")}
                      >
                        Verify
                      </button>
                    )}
                    {item.complete_profile === 1 ? (
                      <button className="btn btn-primary" disabled>
                        Completed
                      </button>
                    ) : (
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          updateSelectKey(item.id, "complete_profile", 1)
                        }
                      >
                        Complete
                      </button>
                    )}
                  </TableCell>
                  <TableCell align="center">{item.wallet}</TableCell>
                  <TableCell align="center">{item.payin_upi}</TableCell>
                  <TableCell align="center">{item.payout_neft}</TableCell>
                  <TableCell align="center">{item.payout_imps}</TableCell>
                  <TableCell align="center">{item.payout_rtgs}</TableCell>
                  <TableCell align="center">{item.rolling_reverse}</TableCell>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">
                    {item.secretkey}
                    <button
                      className="m-2"
                      onClick={() => updateSelectKey(item.id, "secretkey", 1)}
                    >
                      <CachedIcon color="primary" />
                    </button>
                  </TableCell>
                  <TableCell align="center">
                    {item.sec_iv}
                    <button
                      className="m-2"
                      onClick={() => updateSelectKey(item.id, "sec_iv", 2)}
                    >
                      <CachedIcon color="primary" />
                    </button>
                  </TableCell>
                  <TableCell align="center">
                    {item.test_secretkey}
                    <button
                      className="m-2"
                      onClick={() =>
                        updateSelectKey(item.id, "test_secretkey", 3)
                      }
                    >
                      <CachedIcon color="primary" />
                    </button>
                  </TableCell>
                  <TableCell align="center">
                    {item.test_sec_iv}
                    <button
                      className="m-2"
                      onClick={() => updateSelectKey(item.id, "test_sec_iv", 4)}
                    >
                      <CachedIcon color="primary" />
                    </button>
                  </TableCell>
                  <TableCell align="center">{item.settle_currency}</TableCell>
                  <TableCell align="center">
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "150px" }}
                      value={item.gateway_id}
                      onChange={(e) => {
                        updateSelectKey(item.id, "gateway_id", e.target.value);
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {paymentData.map((payment, indexPayment) => {
                        return (
                          <option value={payment.id} key={indexPayment}>
                            {payment.gateway_name}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      className="form-select form-select-sm my-3"
                      value={item.card_url}
                      onChange={(e) => {
                        updateSelectKey(item.id, "card_url", e.target.value);
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url, urlIndex) => {
                        return (
                          <option value={url.merchant_url} key={urlIndex}>
                            {url.merchant_url}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      className="form-select form-select-sm my-3"
                      value={item.card_otherurl}
                      onChange={(e) => {
                        updateSelectKey(
                          item.id,
                          "card_otherurl",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url) => {
                        return (
                          <option value={url.merchant_otherurl} key={url.id}>
                            {url.merchant_otherurl}
                          </option>
                        );
                      })}
                    </select>
                  </TableCell>
                  <TableCell align="center">
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "150px" }}
                      value={item.gateway_id_2}
                      onChange={(e) => {
                        updateSelectKey(
                          item.id,
                          "gateway_id_2",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {paymentData.map((payment) => {
                        return (
                          <option value={payment.id} key={payment.id}>
                            {payment.gateway_name}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      className="form-select form-select-sm my-3"
                      value={item.upi_url}
                      onChange={(e) => {
                        updateSelectKey(item.id, "upi_url", e.target.value);
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url) => {
                        return (
                          <option value={url.merchant_url} key={url.id}>
                            {url.merchant_url}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      className="form-select form-select-sm my-3"
                      value={item.upi_otherurl}
                      onChange={(e) => {
                        updateSelectKey(
                          item.id,
                          "upi_otherurl",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url) => {
                        return (
                          <option value={url.merchant_otherurl} key={url.id}>
                            {url.merchant_otherurl}
                          </option>
                        );
                      })}
                    </select>
                  </TableCell>
                  <TableCell align="center">
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "150px" }}
                      value={item.gateway_id_3}
                      onChange={(e) => {
                        updateSelectKey(
                          item.id,
                          "gateway_id_3",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {paymentData.map((payment) => {
                        return (
                          <option value={payment.id} key={payment.id}>
                            {payment.gateway_name}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      className="form-select form-select-sm my-3"
                      value={item.netBanking_url}
                      onChange={(e) => {
                        updateSelectKey(
                          item.id,
                          "netBanking_url",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url) => {
                        return (
                          <option value={url.merchant_url} key={url.id}>
                            {url.merchant_url}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      className="form-select form-select-sm my-3"
                      value={item.netbanking_otherurl}
                      onChange={(e) => {
                        updateSelectKey(
                          item.id,
                          "netbanking_otherurl",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url) => {
                        return (
                          <option value={url.merchant_otherurl} key={url.id}>
                            {url.merchant_otherurl}
                          </option>
                        );
                      })}
                    </select>
                  </TableCell>

                  <TableCell align="center">
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "150px" }}
                      value={item.gateway_id_4}
                      onChange={(e) => {
                        updateSelectKey(
                          item.id,
                          "gateway_id_4",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {paymentData.map((payment) => {
                        return (
                          <option value={payment.id} key={payment.id}>
                            {payment.gateway_name}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      className="form-select form-select-sm my-3"
                      value={item.wallet_url}
                      onChange={(e) => {
                        updateSelectKey(item.id, "wallet_url", e.target.value);
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url) => {
                        return (
                          <option value={url.merchant_url} key={url.id}>
                            {url.merchant_url}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      className="form-select form-select-sm my-3"
                      value={item.wallet_otherurl}
                      onChange={(e) => {
                        updateSelectKey(
                          item.id,
                          "wallet_otherurl",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url) => {
                        return (
                          <option value={url.merchant_otherurl} key={url.id}>
                            {url.merchant_otherurl}
                          </option>
                        );
                      })}
                    </select>
                  </TableCell>

                  <TableCell align="center">
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "150px" }}
                      value={item.gateway_id_5}
                      onChange={(e) => {
                        updateSelectKey(
                          item.id,
                          "gateway_id_5",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {paymentData.map((payment) => {
                        return (
                          <option value={payment.id} key={payment.id}>
                            {payment.gateway_name}
                          </option>
                        );
                      })}
                    </select>

                    {/* warning aa rahe */}

                    <select
                      className="form-select form-select-sm my-3"
                      value={item.qr_url}
                      onChange={(e) => {
                        updateSelectKey(item.id, "qr_url", e.target.value);
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url, index) => {
                        return (
                          <option value={url.merchant_url} key={index}>
                            {url.merchant_url}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      className="form-select form-select-sm my-3"
                      value={item.qr_otherurl}
                      onChange={(e) => {
                        updateSelectKey(item.id, "qr_otherurl", e.target.value);
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {urlData.map((url) => {
                        return (
                          <option value={url.merchant_otherurl} key={url.id}>
                            {url.merchant_otherurl}
                          </option>
                        );
                      })}
                    </select>
                    {/* warning aa rahe End */}
                  </TableCell>

                  <TableCell align="center">
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "150px" }}
                      value={item.payout_gateway_id}
                      onChange={(e) => {
                        updateSelectKey(
                          item.id,
                          "payout_gateway_id",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Please Select">Please Select</option>
                      {payoutGateWay.map((payout, index2) => {
                        return (
                          <option value={payout.id} key={index2}>
                            {payout.gateway_name}
                          </option>
                        );
                      })}
                    </select>
                  </TableCell>

                  <TableCell align="center">
                    {item.status === 1 ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => updateSelectKey(item.id, "status", 0)}
                      >
                        Enable
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        onClick={() => updateSelectKey(item.id, "status", 1)}
                      >
                        Disable
                      </button>
                    )}
                  </TableCell>

                  <TableCell align="center">
                    {item.allow_webpayment === 1 ? (
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          updateSelectKey(item.id, "allow_webpayment", 0)
                        }
                      >
                        Enable
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          updateSelectKey(item.id, "allow_webpayment", 1)
                        }
                      >
                        Disable
                      </button>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <div className="d-flex  align-items-center justify-content-around flex-column">
                      {authRead ? (
                        <Link to={`/readMerchantAdmin/${item.id}`}>
                          <button style={{ background: "transparent" }}>
                            <RemoveRedEyeIcon sx={{ color: "#ffab12" }} />
                          </button>
                        </Link>
                      ) : null}

                      {authUpdate ? (
                        <Link to={`/EditMerchantAdmin/${item.id}`}>
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
                  <TableCell align="center">{item.updated_on}</TableCell>
                  <TableCell align="center">
                    <div className="d-flex flex-column">
                      <img
                        src="./imgs/avatar.svg"
                        alt="not found"
                        width="100px"
                      />
                      <h6 style={{ fontSize: "12px", fontWeight: "600" }}>
                        Img Not Found
                      </h6>
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
          <h4 className="mb-3 headingAll"> Manage Merchants List</h4>
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
              <Link to="/AddNewMerchantAdmin">
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

export default MerchantAdmin;
