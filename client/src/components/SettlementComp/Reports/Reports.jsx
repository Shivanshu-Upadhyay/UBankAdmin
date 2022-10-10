import React, {  useState } from "react";
import "./report.css";
import Menu from "@mui/material/Menu";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import * as XLSX from "xlsx";
function Reports() {
  const [todate, SetToDate] = useState("");
  const [fromdate, SetToFromDate] = useState("");
  return (
    <div>
      <div className=" d-flex justify-content-between align-items-center">
        <h4 className="heading mx-3">Reports</h4>

        <FilterDate
          todate={todate}
          SetToDate={SetToDate}
          fromdate={fromdate}
          SetToFromDate={SetToFromDate}
        />
      </div>

      <div className="text-end mx-4"></div>
      <Block2 todate={todate} fromdate={fromdate} />
    </div>
  );
}
function FilterDate({ todate, SetToDate, fromdate, SetToFromDate }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button
        className="filterdate"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ width: "200px" }}
      >
        <img
          src="https://www.bankconnect.online/assets/merchants/img/calender.svg"
          alt=""
          className="mx-2"
        />
        Filter Date
        <img
          src="https://www.bankconnect.online/assets/merchants/img/cev-down.svg"
          alt=""
          className="mx-2"
        />
      </button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        className="my-3"
      >
        <form className="row m-4 align-items-center">
          <div className="col-12 d-flex " style={{ width: "38rem" }}>
            <input
              type="date"
              className="dateinput col-5 `"
              value={todate}
              onChange={(e) => SetToDate(e.target.value)}
            />
            <div className="col-2 text-center mt-2">
              <b>To</b>
            </div>
            <input
              type="date"
              className="dateinput col-4"
              value={fromdate}
              onChange={(e) => SetToFromDate(e.target.value)}
            />
          </div>
        </form>
      </Menu>
    </>
  );
}

const Section1 = ({
  heading,
  discription,
  todate,
  fromdate,
  buttonVal,
  data,
  
}) => {
  const downloadExl = () => {
    // const fetchData = async () => {
    //   try {
    //     const auth = localStorage.getItem("user");
    //     let formData = new FormData();
    //     formData.append("value", buttonVal);
    //     if (todate && fromdate) {
    //       formData.append("from", todate);
    //       formData.append("to", fromdate);
    //     }

    //     const config = {
    //       headers: {
    //         "content-type": "multipart/form-data",
    //         Authorization: `Bearer ${auth}`,
    //       },
    //     };
    //     const { data } = await axios.post(
    //       `${baseUrl}/accountSummary`,
    //       formData,
    //       config
    //     );
    //     console.log(data);
        
    //     const workSheet = XLSX.utils.json_to_sheet(data.data);
    //     const workBook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workBook, workSheet, `report${Date.now()}`);

    //     // Binary String
    //     XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //     // Download
    //     XLSX.writeFile(workBook, `report${Date.now()}.xlsx`);
    //   } catch (err) {
    //     console.log(err);
    //   }
     
    // };
   
    // fetchData();
  };
  return (
    <>
      <div className="row  m-3 monthBlock">
        <div className="col-8">
          <h6 style={{ fontWeight: "700", fontSize: "14px" }}>{heading}</h6>
          <p style={{ fontSize: "12px", color: "#666666" }}>{discription}</p>
        </div>

        <div className="col-4 text-end">
          <button className="downloadbtn1" onClick={downloadExl}>
            <img
              src="https://www.bankconnect.online/assets/merchants/img/download-white.svg"
              alt="not"
              width="17px"
              className="mx-2"
            />
            Download Report
          </button>
        </div>
      </div>
      <hr className="border" />
    </>
  );
};

const Block2 = ({ todate, fromdate }) => {
 
  

  

  return (
    <>
      <div className="containerShadow mx-3 my-4">
        <Section1
          heading="Merchant Settlement"
          discription="A breakdown of local settlement merchant wise."
          buttonVal={1}
          todate={todate} 
          fromdate={fromdate}
          
        />
        <Section1
          heading="Payout by Currency (Local)"
          discription="Report of settlement to merchant local currency wise"
          buttonVal={2}
          todate={todate} 
          fromdate={fromdate}
        />
        <Section1
          heading="Settlement By Currency (Cross border/International)"
          discription="Report of international settlement to merchant by currency."
          buttonVal={3}
          todate={todate} 
          fromdate={fromdate}
        />
        <Section1
          heading="Settlement From Bank/Acquirer"
          discription="Report on received settlement from bank/acquirer."
          buttonVal={4}
        />
        <Section1
          heading="Commissions Through International Settlement"
          discription="Report of commissions through international settlement."
          buttonVal={5}
          todate={todate} 
          fromdate={fromdate}
        />
        <Section1
          heading="Commissions By Merchants"
          discription="Report of commissions by merchants."
          buttonVal={6}
        />
        <Section1
          heading="Commissions By Deposits"
          discription="Report of commissions by deposits."
          buttonVal={7}
        />
        <Section1
          heading="Commissions By Payouts"
          discription="Report of commissions by payouts."
          buttonVal={8}
        />
        <Section1
          heading="Commissions By Currency"
          discription="Report of commissions by currency."
          buttonVal={9}
        />
        <Section1
          heading="Commissions Through Chargeback/Disputes"
          discription="Report of commissions through chargeback/disputes."
          buttonVal={10}
        />
        <Section1
          heading="Chargeback/Disputes Merchants Wise"
          discription="Report of cchargeback/disputes merchants wise."
          buttonVal={11}
        />
      </div>
    </>
  );
};

export default Reports;