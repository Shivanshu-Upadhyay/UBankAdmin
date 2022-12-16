import React, { useEffect, useState } from "react";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


function ViewMerchant() {

  const [tableData, setTableData] = useState([]);
  let { invoice_id } = useParams();

  const fetchData = async () => {
    try {
      let formData = new FormData();
      formData.append("id", invoice_id);
      let result = await axios.post(
        `${baseUrl}/getIdMT`,
        formData
      );
      console.log(result.data.data[0])
      setTableData(result.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => { 
    fetchData();
  }, []);

  
  const toggleStatus = async (id, status) => {
    try {
      let formData = new FormData();
      console.log(id, status);
      formData.append("id", id);
      if (status === 0 ) {
        formData.append("status", 0);
      } else if (status === 1 ){
        formData.append("status", 1);
      } else if (status === 2) {
        formData.append("status", 2);
      } else if (status === 3) {
        formData.append("status", 3);
      } else if (status === 4 ){
        formData.append("status", 4);
      } else if (status === 5 ){
        formData.append("status", 5)
      }

      let result = await axios.post(`${baseUrl}/toggleStatusMT`, formData);
      fetchData()
      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className="tablebox">
      <div className="row">
        <div className="col-6">
          <h2>Details</h2>
        </div>
        <div className="col-6">
          <Link to="/MerchantTrans">
            <button style={{ 
              background: "#ff6600", 
              width: "100px", 
              height: "36px", 
              borderRadius: "30px",
              float: "right",
              color: "#fff"
              }}>
              Back
            </button>
          </Link>
        </div>
      </div>
      <table className="table">
        <tbody>
          <tr>
            <th>Merchant Name</th>
            <td>{tableData.i_fname}</td>
          </tr>
          <tr>
            <th>Sign Info</th>
            <td>{tableData.sign_info}</td>
          </tr>
          <tr>
            <th>Order No</th>
            <td>{tableData.order_no}</td>
          </tr>
          <tr>
            <th>Transaction Id</th>
            <td>{tableData.transaction_id}</td>
          </tr>
          <tr>
            <th>Transaction Status</th>
            <td>{tableData.payment_status}</td>
          </tr>
          <tr>
            <th>Currency</th>
            <td>{tableData.ammount_type}</td>
          </tr>
          <tr>
            <th>Total Amount</th>
            <td>{tableData.ammount}</td>
          </tr>
          <tr>
            <th>Tax Amount</th>
            <td>{tableData.tax_amt}</td>
          </tr>
          <tr>
            <th>Payin Charges</th>
            <td>{tableData.payin_charges}</td>
          </tr>
          <tr>
            <th>GST Amount</th>
            <td>{tableData.gst_charges}</td>
          </tr>
          <tr>
            <th>Bank GST Amount</th>
            <td>{tableData.our_bank_charge}</td>
          </tr>
          <tr>
            <th>Bank Charges with GST</th>
            <td>{tableData.our_bank_charge_gst}</td>
          </tr>
          <tr>
            <th>RR Amount</th>
            <td>{tableData.rolling_reverse_amount}</td>
          </tr>
          <tr>
            <th>Availabe Settle Amount</th>
            <td>{tableData.settle_amount}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>
            {tableData.status === 0 ? (
                <button className="btn btn-danger">Failed</button>
              ) : tableData.status === 1 ? (
                <button className="btn btn-success">Success</button>
              ) : tableData.status === 2 ? (
                <button className="btn btn-info">Waiting</button>
              ) : tableData.status === 3 ? (
                <button className="btn btn-warning">Pending</button>
              ) : tableData.status === 4 ? (
                <button className="btn btn-primary">Refund</button>
              ) : (
                <button className="btn btn-secondary">ChargeBack</button>
              )}
            </td>
          </tr>
          <tr>
            <th>Change Status</th>
            <td>
              <div>
                <button className="btn btn-success" style={{marginBottom: "10px"}}
                onClick={() => toggleStatus(tableData.invoice_id, 1)}
                >Success</button>
              </div>
                
              <div>
                <button className="btn btn-danger" style={{marginBottom: "10px"}}
                onClick={() => toggleStatus(tableData.invoice_id, 0)}
                >Failed</button>
              </div>

              <div>
                <button className="btn btn-info" style={{marginBottom: "10px"}}
                onClick={() => toggleStatus(tableData.invoice_id, 2)}
                >Waiting</button>
              </div>
              
              <div>
                <button className="btn btn-warning" style={{marginBottom: "10px"}}
                onClick={() => toggleStatus(tableData.invoice_id, 3)}
                >Pending</button>
              </div>

              <div>
                <button className="btn btn-primary" style={{marginBottom: "10px"}}
                onClick={() => toggleStatus(tableData.invoice_id, 4)}
                >Refund</button>
              </div>

              <div>
                <button className="btn btn-secondary"
                onClick={() => toggleStatus(tableData.invoice_id, 5)}
                >ChargeBack</button>
              </div>
            </td>
          </tr>

          <h2>Other Information</h2>

          <tr>
            <th>Redirect to</th>
            <td>{tableData.redirection_url}</td>
          </tr>
          <tr>
            <th>Endpoint URL</th>
            <td>{tableData.end_point_url}</td>
          </tr>
          <tr>
            <th>User IP</th>
            <td>{tableData.i_ip}</td>
          </tr>
          <tr>
            <th>Full Name</th>
            <td>{tableData.i_flname}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{tableData.i_email}</td>
          </tr>
          <tr>
            <th>Mobile No</th>
            <td>{tableData.i_number}</td>
          </tr>
          <tr>
            <th>Request Date</th>
            <td>{tableData.curl_request_date}</td>
          </tr>
          <tr>
            <th>Update Date</th>
            <td>{tableData.updated_on}</td>
          </tr>
          <tr>
            <th>Billing Address</th>
            <td>{tableData.bill_address}</td>
          </tr>
          <tr>
            <th>Country</th>
            <td>{tableData.i_country}</td>
          </tr>
          <tr>
            <th>State</th>
            <td>{tableData.i_state}</td>
          </tr>
          <tr>
            <th>City</th>
            <td>{tableData.i_city}</td>
          </tr>
          <tr>
            <th>ZIP</th>
            <td>{tableData.i_zip}</td>
          </tr>
          <tr>
            <th>Merchant End Point Store Response</th>
            <td>{tableData.merchant_db_response}</td>
          </tr>
          <tr>
            <th>Settlement date</th>
            <td>{tableData.settlement_on}</td>
          </tr>
          <tr>
            <th>RR date	</th>
            <td>{tableData.rolling_reverse_on}</td>
          </tr>
          <tr>
            <th>Transaction Type T/L</th>
            <td>
              {tableData.trx_live_test === 1 ? (
                <h6>Live</h6>
              ) : (
                <h6>Test</h6>
              )}
            </td>
          </tr>
          <tr>
            <th>Cron Counter</th>
            <td>{tableData.curl_request_counter}</td>
          </tr>
          <tr>
            <th>Cron Counter Date</th>
            <td>{tableData.curl_request_date}</td>
          </tr>
          <tr>
            <th>Merchant to Ubank Connect Request</th>
            <td>{}</td>
          </tr>
          <tr>
            <th>Ubank Connect to Bank Request</th>
            <td>{}</td>
          </tr>
          <tr>
            <th>Bank Logs</th>
            <td>{}</td>
          </tr>
          <tr>
            <th>Bank Logs for update db time</th>
            <td>{}</td>
          </tr>
          <tr>
            <th>Cron Logs</th>
            <td>{}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  )
}

export default ViewMerchant