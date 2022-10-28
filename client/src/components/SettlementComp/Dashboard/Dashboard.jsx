import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import baseUrl from "../../config/baseUrl";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

//----Amount----//
import YesterdaySettlementAmount from '../Graphs/SettlementAmount/YesterdaySettlementAmount'
import WeeklySettlementAmount from '../Graphs/SettlementAmount/WeeklySettlementAmount';
import MonthlySettlementAmount from '../Graphs/SettlementAmount/MonthlySettlementAmount';
import YearlySettlementAmount from '../Graphs/SettlementAmount/YearlySettlementAmount';
//----Amount----//

//----Transactions----//
import InternationalYesterday from '../Graphs/InternationalSettlement/InternationalYesterday';
import InternationalWeekly from '../Graphs/InternationalSettlement/InternationalWeekly';
import InternationalMonthly from '../Graphs/InternationalSettlement/InternationalMonthly';
import InternationalYearly from '../Graphs/InternationalSettlement/InternationalYearly';
//----Transactions----//

//----Settlement---//
import LocalYesterday from '../Graphs/LocalSettlement/LocalYesterday';
import LocalWeekly from '../Graphs/LocalSettlement/LocalWeekly';
import LocalMonthly from '../Graphs/LocalSettlement/LocalMonthly';
import LocalYearly from '../Graphs/LocalSettlement/LocalYearly';
//----Settlement---//

//----Commissions---//
import CommissionsYesterday from '../Graphs/Commissions/CommissionsYesterday';
import CommissionsWeekly from '../Graphs/Commissions/CommissionsWeekly';
import CommissionsMonthly from '../Graphs/Commissions/CommissionsMonthly';
import CommissionsYearly from '../Graphs/Commissions/CommissionsYearly';
//----Commissions---//

function SettlementDashboard() {
  const [topLocal, setTopLocal] = useState('');
  const [topInternational, setTopInternational]= useState('')
  const[topCurrency, setTopCurrency] = useState([]);
  const auth = localStorage.getItem("admin");
  const ReadData = async () => {
    try {
      let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/dashboardTable`,
        formData,
        config
      );

      setTopLocal(result.data.data.topLocal)
      setTopInternational(result.data.data.topInternational)
      setTopCurrency(result.data.data.topCurrency)

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ReadData();
  }, []);

  return (
    <>
      <div className="row mb-5">
        <div className="col-6">
          <div className="settleGraphBox">
            <div className="settleRowHeading">
              <h2>
                <img src="./imges/settleamount.svg" alt="" />
                Amount Received For Settlement
              </h2>
            </div>
            <Tabs
              defaultActiveKey="yesterday"
              transition={false}
              justify
              className="mb-3 dance"
            >
              <Tab eventKey="yesterday"
                title={
                <h6 className="tabHeading">
                  <img src="./imges/settledaily.svg" className="tabIcons" alt="" />
                  Yesterday
                </h6>}>
                <YesterdaySettlementAmount />
              </Tab>
              <Tab eventKey="weekly" 
                title={
                <h6 className='tabHeading'>
                  <img src="./imges/settleweekly.svg" className="tabIcons" alt="" />
                  Weekly
                </h6>}>
                <WeeklySettlementAmount />
              </Tab>
              <Tab eventKey="monthly" 
                title={
                <h6 className='tabHeading'>
                  <img src="./imges/settlemonthly.svg" className="tabIcons" alt="" />
                  Monthly
                </h6>}>
                <MonthlySettlementAmount />
              </Tab>
              <Tab eventKey="yearly" 
                title={
                <h6 className='tabHeading'>
                  <img src="./imges/settleyearly.svg" className="tabIcons" alt="" />
                  Yearly
                </h6>}>
                <YearlySettlementAmount />
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className="col-6">
          <div className="settleGraphBox">
            <div className="settleRowHeading">
              <h2>
                <img src="./imges/local.svg" alt="" />
                Local Settlement
              </h2>
            </div>
            <Tabs
              defaultActiveKey="yesterday"
              transition={false}
              justify
              className="mb-3 dance"
            >
              <Tab eventKey="yesterday" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settledaily.svg" className="tabIcons" alt="" />
                  Yesterday
                </h6>}>
                <LocalYesterday />
              </Tab>
              <Tab eventKey="weekly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settleweekly.svg" className="tabIcons" alt="" />
                  Weekly
                </h6>}>
                <LocalWeekly />
              </Tab>
              <Tab eventKey="monthly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settlemonthly.svg" className="tabIcons" alt="" />
                  Monthly
                </h6>}>
                <LocalMonthly />
              </Tab>
              <Tab eventKey="yearly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settleyearly.svg" className="tabIcons" alt="" />
                  Yearly
                </h6>}>
                <LocalYearly />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-6">
          <div className="settleGraphBox">
            <div className="settleRowHeading">
              <h2>
                <img src="./imges/international.svg" alt="" />
                International Settlement
              </h2>
            </div>
            <Tabs
              defaultActiveKey="yesterday"
              transition={false}
              justify
              className="mb-3 dance"
            >
              <Tab eventKey="yesterday" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settledaily.svg" className="tabIcons" alt="" />
                  Yesterday
                </h6>}>
                {/* <h6 className="text">$10</h6> */}
                <InternationalYesterday />
              </Tab>
              <Tab eventKey="weekly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settleweekly.svg" className="tabIcons" alt="" />
                  Weekly
                </h6>}>
                {/* <h6 className="text">$100</h6> */}
                <InternationalWeekly />
              </Tab>
              <Tab eventKey="monthly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settlemonthly.svg" className="tabIcons" alt="" />
                  Monthly
                </h6>}>
                {/* <h6 className="text">500</h6> */}
                <InternationalMonthly />
              </Tab>
              <Tab eventKey="yearly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settleyearly.svg" className="tabIcons" alt="" />
                  Yearly
                </h6>}>
                {/* <h6 className="text">2000</h6> */}
                <InternationalYearly />
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className="col-6">
          <div className="settleGraphBox">
            <div className="settleRowHeading">
              <h2>
                <img src="./imges/commissions.svg" alt="" />
                Commissions
              </h2>
            </div>
            <Tabs
              defaultActiveKey="yesterday"
              transition={false}
              justify
              className="mb-3 dance"
            >
              <Tab eventKey="yesterday" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settledaily.svg" className="tabIcons" alt="" />
                  Yesterday
                </h6>}>
                {/* <h6 className="text">$100</h6> */}
                <CommissionsYesterday />
              </Tab>
              <Tab eventKey="weekly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settleweekly.svg" className="tabIcons" alt="" />
                  Weekly
                </h6>}>
                {/* <h6 className="text">$500</h6> */}
                <CommissionsWeekly />
              </Tab>
              <Tab eventKey="monthly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settlemonthly.svg" className="tabIcons" alt="" />
                  Monthly
                </h6>}>
                {/* <h6 className="text">$1000</h6> */}
                <CommissionsMonthly />
              </Tab>
              <Tab eventKey="yearly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settleyearly.svg" className="tabIcons" alt="" />
                  Yearly
                </h6>}>
                {/* <h6 className="text">$10000</h6> */}
                <CommissionsYearly />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-4">
          <div className="settleGraphBox">
            <div className="settleRowHeading">
              <h2>
                <img src="./imges/merchantadmin.png" alt="" />
                Top Merchant (Local Payout)
              </h2>
            </div>
            <div className="newscroll">
              <table className="table table-borderless">
                <thead>
                  <th>Merchant Name</th>
                  <th>Amount</th>
                </thead>
                <tbody>
                  {Object.keys(topLocal).length > 0 ? (
                    topLocal.map((item, index) => {
                      return (
                        <tr>
                          <td>{item.name}</td>
                          <td>{item.amount}</td>
                        </tr>
                        );
                    })
                  ) : (
                      <tr>
                        <h6 style={{textAlign: "center"}}>No Transaction Found</h6>
                      </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="settleGraphBox">
            <div className="settleRowHeading">
              <h2>
                <img src="./imges/merchantadmin.png" alt="" />
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Top Merchant <br /> (International Settlement)
              </h2>
            </div>
            <div className="newscroll">
              <table className="table table-borderless">
                <thead>
                  <th>Merchant Name</th>
                  <th>Amount</th>
                </thead>
                <tbody>
                  {Object.keys(topInternational).length > 0 ? (
                    topInternational.map((item, index) => {
                      return (
                        <tr>
                          <td>{item.name}</td>
                          <td>{item.amount}</td>
                        </tr>
                        );
                    })
                  ) : (
                      <tr>
                        <h6 style={{textAlign: "center"}}>No Transaction Found</h6>
                      </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="settleGraphBox">
            <div className="settleRowHeading">
              <h2>
                <img src="./imges/admincurrency.png" alt="" />
                Top Merchant Settlement <br/> (Currency wise)
              </h2>
            </div>
            <div className="newscroll">
              <table className="table table-borderless">
                <thead>
                  <th>Currency</th>
                  <th>Merchant Name</th>
                  <th>Amount</th>
                </thead>
                <tbody>
                  {
                    topCurrency?.map((item, index) => {
                      return (
                        <tr>
                          <td>
                          <img
                              src={
                                item.currency === "INR"
                                  ? "./imges/rupee.svg"
                                  : item.currency === "CNY"
                                  ? "./imges/yuan.svg"
                                  : item.currency === "IDR"
                                  ? "./imges/rp.svg"
                                  : item.currency === "THB"
                                  ? "./imges/bhat.svg"
                                  : item.currency === "VND"
                                  ? "./imges/dong.svg"
                                  : item.currency === "USD"
                                  ? "./imges/usdollar.svg"
                                  : item.currency === "PHP"
                                  ? "./imges/peso.svg"
                                  : item.currency === "MYR"
                                  ? "./imges/rm.svg"
                                  : item.currency === "CLP"
                                  ? "./imges/clp.svg"
                                  : item.currency === "MXN"
                                  ? "./imges/mxn.svg"
                                  : item.currency === "PEN"
                                  ? "./imges/pen.svg"
                                  : item.currency === "GTQ"
                                  ? "./imges/gtq.svg"
                                  : item.currency === "CRC"
                                  ? "./imges/crc.svg"
                                  : item.currency === "BRL"
                                  ? "./imges/brl.svg"
                                  : item.currency === "PKR"
                                  ? "./imges/pkr.svg"
                                  : item.currency === "KRW"
                                  ? "./imges/krw.svg"
                                  : ""
                              }
                              alt=""
                              width="60px"
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.amount}</td>
                        </tr>
                        );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettlementDashboard;
