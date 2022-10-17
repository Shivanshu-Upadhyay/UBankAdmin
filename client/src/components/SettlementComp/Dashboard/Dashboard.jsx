import React from "react";
import "./style.css";

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
                <h6 className="text">$100</h6>
                <YesterdaySettlementAmount />
              </Tab>
              <Tab eventKey="weekly" 
                title={
                <h6 className='tabHeading'>
                  <img src="./imges/settleweekly.svg" className="tabIcons" alt="" />
                  Weekly
                </h6>}>
                <h6 className="text">$1000</h6>
                <WeeklySettlementAmount />
              </Tab>
              <Tab eventKey="monthly" 
                title={
                <h6 className='tabHeading'>
                  <img src="./imges/settlemonthly.svg" className="tabIcons" alt="" />
                  Monthly
                </h6>}>
                <h6 className="text">$100000</h6>
                <MonthlySettlementAmount />
              </Tab>
              <Tab eventKey="yearly" 
                title={
                <h6 className='tabHeading'>
                  <img src="./imges/settleyearly.svg" className="tabIcons" alt="" />
                  Yearly
                </h6>}>
                <h6 className="text">$1000000</h6>
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
                <h6 className="text">$100</h6>
                <LocalYesterday />
              </Tab>
              <Tab eventKey="weekly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settleweekly.svg" className="tabIcons" alt="" />
                  Weekly
                </h6>}>
                <h6 className="text">$500</h6>
                <LocalWeekly />
              </Tab>
              <Tab eventKey="monthly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settlemonthly.svg" className="tabIcons" alt="" />
                  Monthly
                </h6>}>
                <h6 className="text">$1000</h6>
                <LocalMonthly />
              </Tab>
              <Tab eventKey="yearly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settleyearly.svg" className="tabIcons" alt="" />
                  Yearly
                </h6>}>
                <h6 className="text">$10000</h6>
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
                <h6 className="text">$10</h6>
                <InternationalYesterday />
              </Tab>
              <Tab eventKey="weekly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settleweekly.svg" className="tabIcons" alt="" />
                  Weekly
                </h6>}>
                <h6 className="text">$100</h6>
                <InternationalWeekly />
              </Tab>
              <Tab eventKey="monthly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settlemonthly.svg" className="tabIcons" alt="" />
                  Monthly
                </h6>}>
                <h6 className="text">500</h6>
                <InternationalMonthly />
              </Tab>
              <Tab eventKey="yearly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settleyearly.svg" className="tabIcons" alt="" />
                  Yearly
                </h6>}>
                <h6 className="text">2000</h6>
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
                <h6 className="text">$100</h6>
                <CommissionsYesterday />
              </Tab>
              <Tab eventKey="weekly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settleweekly.svg" className="tabIcons" alt="" />
                  Weekly
                </h6>}>
                <h6 className="text">$500</h6>
                <CommissionsWeekly />
              </Tab>
              <Tab eventKey="monthly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settlemonthly.svg" className="tabIcons" alt="" />
                  Monthly
                </h6>}>
                <h6 className="text">$1000</h6>
                <CommissionsMonthly />
              </Tab>
              <Tab eventKey="yearly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/settleyearly.svg" className="tabIcons" alt="" />
                  Yearly
                </h6>}>
                <h6 className="text">$10000</h6>
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
                  <tr>
                      <td>SBI</td>
                      <td>10000</td>
                  </tr>
                  <tr>
                      <td>BOB</td>
                      <td>100000</td>
                  </tr>
                  <tr>
                      <td>BOI</td>
                      <td>10000</td>
                  </tr>
                  <tr>
                      <td>CANARA BANK</td>
                      <td>100000</td>
                  </tr>
                  <tr>
                      <td>PUNJAB NATIONAL BANK</td>
                      <td>10000</td>
                  </tr>
                  <tr>
                      <td>INDIAN BANK</td>
                      <td>10000</td>
                  </tr>
                  <tr>
                      <td>ICICI BANK</td>
                      <td>10000</td>
                  </tr>
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
                  <tr>
                      <td>SBI</td>
                      <td>10000</td>
                  </tr>
                  <tr>
                      <td>BOB</td>
                      <td>100000</td>
                  </tr>
                  <tr>
                      <td>BOI</td>
                      <td>10000</td>
                  </tr>
                  <tr>
                      <td>CANARA BANK</td>
                      <td>100000</td>
                  </tr>
                  <tr>
                      <td>PUNJAB NATIONAL BANK</td>
                      <td>10000</td>
                  </tr>
                  <tr>
                      <td>INDIAN BANK</td>
                      <td>10000</td>
                  </tr>
                  <tr>
                      <td>ICICI BANK</td>
                      <td>10000</td>
                  </tr>
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
                  <tr>
                    <td><img src="./imges/rupee.svg" alt="" /></td>
                    <td>INR</td>
                    <td>10000</td>
                  </tr>
                  <tr>
                    <td><img src="./imges/usdollar.svg" alt="" /></td>
                    <td>DOLLAR</td>
                    <td>100000</td>
                  </tr>
                  <tr>
                    <td><img src="./imges/yuan.svg" alt="" /></td>
                    <td>CNY</td>
                    <td>10000</td>
                  </tr>
                  <tr>
                    <td><img src="./imges/bhat.svg" alt="" /></td>
                    <td>THB</td>
                    <td>100000</td>
                  </tr>
                  <tr>
                    <td><img src="./imges/dong.svg" alt="" /></td>
                    <td>VND</td>
                    <td>10000</td>
                  </tr>
                  <tr>
                    <td><img src="./imges/peso.svg" alt="" /></td>
                    <td>PHP</td>
                    <td>10000</td>
                  </tr>
                  <tr>
                    <td><img src="./imges/rp.svg" alt="" /></td>
                    <td>IDR</td>
                    <td>10000</td>
                  </tr>
                  <tr>
                    <td><img src="./imges/rm.svg" alt="" /></td>
                    <td>MYR</td>
                    <td>10000</td>
                  </tr>
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
