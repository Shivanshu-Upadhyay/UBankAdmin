import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../commonComp/Header/Header";
import baseUrl from "../config/baseUrl";
import axios from "axios";
function ReadMerchantAdmin() {
  const { id } = useParams();
  const auth = localStorage.getItem("admin");
  const [data, setData] = useState([]);
  const [walletOps, setWalletOps] = useState(0);
  const [inpWallet, setInpWallet] = useState("");
  const fetchData = async () => {
    try {
      let formData = new FormData();
      formData.append("id", id);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/readOneMerchantAdmin`,
        formData,
        config
      );
      console.log(result.data);
      setData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const updateWallet = async (val) => {
    try {
      let wallet;
      if (walletOps === "1") {
        wallet = Number(inpWallet) + val;
      } else if (walletOps === "2") {
        wallet = val - inpWallet;
      } else {
        wallet=val;
      }
      let formData = new FormData();
      formData.append("wallet", wallet);
      formData.append("id", id);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/updateWallet`,
        formData,
        config
      );
      console.log(result);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="Merchnats  Details" path="/merchantAdmin" />
      <table className="table table-bordered my-4">
        <tbody>
          <Block heading="Wallet Amount" val={data.wallet} />
          <tr>
            <th scope="row" style={{ width: "50%" }}>
              Wallet
            </th>
            <td className="d-flex justify-content-around">
              <select
                className="form-select"
                style={{ width: "30%" }}
                value={walletOps}
                onChange={(e) => setWalletOps(e.target.value)}
              >
                <option value={0}>Select</option>
                <option value={1}>Add(+)</option>
                <option value={2}>Sub(-)</option>
              </select>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ width: "60%" }}
              >
                <input
                  type="number"
                  placeholder="Enter Wallet Amount"
                  value={inpWallet}
                  onChange={(e) => setInpWallet(e.target.value)}
                />
                <button
                  className="btn mx-2 btn-success"
                  onClick={() => updateWallet(data.wallet)}
                >
                  Update
                </button>
              </div>
            </td>
          </tr>
          <HeadingTable heading="Profile" />
          <Block heading="Name" val={data.name} />
          <Block heading="Email" val={data.email} />
          <tr>
            <th scope="row" style={{ width: "50%" }}>
              Profile Completed
            </th>
            <td>{data.complete_profile === 1 ? "Completed" : "Complete"}</td>
          </tr>

          <Block heading="Merchant Key" val={data.id} />
          <Block heading="Secret Key" val={data.secretkey} />
          <HeadingTable heading="Company Profile" />
          <Block heading="Company Name" val={data.bname} />
          <Block
            heading="Trading As / Doing Business As (DBA)"
            val={data.trading_dba}
          />
          <Block heading="Registered Address" val={data.blocation} />
          <Block
            heading="Company Number / Registration Number"
            val={data.busines_Code}
          />
          <Block
            heading="Country of Incorporation"
            val={data.busines_Country}
          />
          <Block heading="Main Contact Person" val={data.name} />
          <Block
            heading="Main Contact Email Address"
            val={data.main_contact_email}
          />
          <HeadingTable heading="Solutions Applying For" />
          <tr>
            <th scope="row" style={{ width: "50%" }}>
              Solutions and Payment Methods
            </th>
            <td>{data.complete_profile === 1 ? "Completed" : "Complete"}</td>
          </tr>
          <HeadingTable heading="Director’s Info" />
          <tr>
            <td colSpan={2} align="center">
              <b>Director 1 Info</b>
            </td>
          </tr>
          <Block heading="Full Name" val={data.director1_name} />
          <Block heading="Date of Birth" val={data.director1_dob} />
          <Block heading="Nationality" val={data.director1_nationality} />
          <tr>
            <td colSpan={2} align="center">
              <b>Director 2 Info</b>
            </td>
          </tr>
          <Block heading="Full Name" val={data.director2_name} />
          <Block heading="Date of Birth" val={data.director2_dob} />
          <Block heading="Nationality" val={data.director2_nationality} />
          <HeadingTable heading="Shareholder Info" />
          <tr>
            <td colSpan={2} align="center">
              <b> Shareholder 1 Info</b>
            </td>
          </tr>
          <Block heading="Full Name" val={data.shareholder1_name} />
          <Block heading="Date of Birth" val={data.shareholder1_dob} />
          <Block heading="Nationality" val={data.shareholder1_nationality} />
          <tr>
            <td colSpan={2} align="center">
              <b> Shareholder 2 Info</b>
            </td>
          </tr>
          <Block heading="Full Name" val={data.shareholder2_name} />
          <Block heading="Date of Birth" val={data.shareholder2_dob} />
          <Block heading="Nationality" val={data.shareholder2_nationality} />
          <HeadingTable heading="Business Info" />
          <Block heading="Website / Processing URL" val={data.website} />
          <Block heading="Nature of Business" val={data.job_title} />
          <Block
            heading="Stimated Monthly Volume per Market (in USD)"
            val={data.company_estimated_monthly_volume}
          />
          <Block
            heading="Average Ticket Size (in USD)"
            val={data.company_avarage_ticket_size}
          />
          <HeadingTable heading="Settelment Info" />
          <Block
            heading="International Settlement Currency"
            val={data.settle_currency}
          />
          <Block
            heading="Crypto Wallet Address (Optional)"
            val={data.wallet_url}
          />
          <Block
            heading="Status"
            val={data.status === 0 ? "Disable" : "Enable"}
          />
          {/* <Block heading="Marchent Image" val={data.image} /> */}
          <tr>
            <th scope="row" style={{ width: "50%" }}>
              Solutions and Payment Methods
            </th>
            <td>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img src="../imgs/avatar.svg" alt="not found" width="100px" />
                <h6 style={{ fontSize: "12px", fontWeight: "600" }}>
                  Img Not Found
                </h6>
              </div>
            </td>
          </tr>
          <Block heading="Created On" val={data.created_on} />
        </tbody>
      </table>
    </>
  );
}

const Block = ({ heading, val }) => {
  return (
    <tr>
      <th scope="row" style={{ width: "50%" }}>
        {heading}
      </th>
      <td>{val}</td>
    </tr>
  );
};

const HeadingTable = ({ heading }) => {
  return (
    <tr className="bg-primary">
      <th scope="row" colSpan={2} className=" text-white">
        {heading}
      </th>
    </tr>
  );
};

export default ReadMerchantAdmin;
