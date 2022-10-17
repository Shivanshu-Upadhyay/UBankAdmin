import React from 'react';
import './dashboard.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

//----Amount----//
import YesterdayDeposit from '../Graphs/Deposit/YesterdayDeposit'
import WeeklyDeposit from '../Graphs/Deposit/WeeklyDeposit';
import MonthlyDeposit from '../Graphs/Deposit/MonthlyDeposit';
import YearlyDeposit from '../Graphs/Deposit/YearlyDeposit';
//----Amount----//

//----Transactions----//
import TransactionsYesterday from '../Graphs/Transactions/TransactionsYesterday';
import TransactionsWeekly from '../Graphs/Transactions/TransactionsWeekly';
import TransactionsMonthly from '../Graphs/Transactions/TransactionsMonthly';
import TransactionsYearly from '../Graphs/Transactions/TransactionsYearly';
//----Transactions----//

//----Settlement---//
import YesterdaySettlement from '../Graphs/Settlement/YesterdaySettlement';
import WeeklySettlement from '../Graphs/Settlement/WeeklySettlement';
import MonthlySettlement from '../Graphs/Settlement/MonthlySettlement';
import YearlySettlement from '../Graphs/Settlement/YearlySettlement';
//----Settlement---//

//----MethodUsed---//
import MethodUsed from '../Graphs/MethodUsed/MethodUsed';
//----MethodUsed---//

//----TopCurrency---//
import TopCurrency from '../Graphs/Top_Currencies/TopCurrency';
//----TopCurrency---//

//----SuccessRate---//
import SuccessRate from '../Graphs/SuccessRate/SuccessRate';
//----SuccessRate---//

function Dashboard() {
  return (

    /* <div className='centerLoder'> */
       
      
    /* </div>  */
    <>
      
      <div className="row mb-5">
        <div className="col-6">
          <div className="graphBox">
            <div className="rowHeading">
              <h2>
                <img src="./imges/deposits.png" alt="" />
                Deposits
              </h2>
            </div>
            <Tabs
              defaultActiveKey="yesterday"
              transition={false}
              justify
              className="mb-3"
            >
              <Tab eventKey="yesterday" 
                title={
                <h6 className='tabHeading'>
                  <img src="./imges/daily.png" className="tabIcons" alt="" />
                  Yesterday
                </h6>}>
                <h6 className="text">$100</h6>
                <YesterdayDeposit />
              </Tab>
              <Tab eventKey="weekly" 
                title={
                <h6 className='tabHeading'>
                  <img src="./imges/weekly.png" className="tabIcons" alt="" />
                  Weekly
                </h6>}>
                <h6 className="text">$1000</h6>
                <WeeklyDeposit />
              </Tab>
              <Tab eventKey="monthly" 
                title={
                <h6 className='tabHeading'>
                  <img src="./imges/monthly.png" className="tabIcons" alt="" />
                  Monthly
                </h6>}>
                <h6 className="text">$100000</h6>
                <MonthlyDeposit />
              </Tab>
              <Tab eventKey="yearly" 
                title={
                <h6 className='tabHeading'>
                  <img src="./imges/yearly.png" className="tabIcons" alt="" />
                  Yearly
                </h6>}>
                <h6 className="text">$1000000</h6>
                <YearlyDeposit />
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className="col-6">
          <div className="graphBox">
            <div className="rowHeading">
              <h2>
                <img src="./imges/transactions.png" alt="" />
                Transactions
              </h2>
            </div>
            <Tabs
              defaultActiveKey="yesterday"
              transition={false}
              justify
              className="mb-3"
            >
              <Tab eventKey="yesterday" title={
                <h6 className='tabHeading'>
                  <img src="./imges/daily.png" className="tabIcons" alt="" />
                  Yesterday
                </h6>}>
                <h6 className="text">10</h6>
                <TransactionsYesterday />
              </Tab>
              <Tab eventKey="weekly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/weekly.png" className="tabIcons" alt="" />
                  Weekly
                </h6>}>
                <h6 className="text">100</h6>
                <TransactionsWeekly />
              </Tab>
              <Tab eventKey="monthly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/monthly.png" className="tabIcons" alt="" />
                  Monthly
                </h6>}>
                <h6 className="text">500</h6>
                <TransactionsMonthly />
              </Tab>
              <Tab eventKey="yearly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/yearly.png" className="tabIcons" alt="" />
                  Yearly
                </h6>}>
                <h6 className="text">2000</h6>
                <TransactionsYearly />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-6">
          <div className="graphBox">
            <div className="rowHeading">
              <h2>
                <img src="./imges/deal.png" alt="" />
                Settlements
              </h2>
            </div>
            <Tabs
              defaultActiveKey="yesterday"
              transition={false}
              justify
              className="mb-3"
            >
              <Tab eventKey="yesterday" title={
                <h6 className='tabHeading'>
                  <img src="./imges/daily.png" className="tabIcons" alt="" />
                  Yesterday
                </h6>}>
                <h6 className="text">$100</h6>
                <YesterdaySettlement />
              </Tab>
              <Tab eventKey="weekly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/weekly.png" className="tabIcons" alt="" />
                  Weekly
                </h6>}>
                <h6 className="text">$500</h6>
                <WeeklySettlement />
              </Tab>
              <Tab eventKey="monthly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/monthly.png" className="tabIcons" alt="" />
                  Monthly
                </h6>}>
                <h6 className="text">$1000</h6>
                <MonthlySettlement />
              </Tab>
              <Tab eventKey="yearly" title={
                <h6 className='tabHeading'>
                  <img src="./imges/yearly.png" className="tabIcons" alt="" />
                  Yearly
                </h6>}>
                <h6 className="text">$10000</h6>
                <YearlySettlement />
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className="col-6">
          <div className="graphBox">
            <div className="rowHeading">
              <h2>
                <img src="./imges/payment.png" alt="" />
                Method Used
              </h2>
            </div>
            <MethodUsed />
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-6">
          <div className="graphBox">
            <div className="rowHeading">
              <h2>
                <img src="./imges/merchantadmin.png" alt="" />
                Top Merchant
              </h2>
            </div>
            <Tabs
              defaultActiveKey="deposit"
              transition={false}
              justify
              className="mb-3"
            >
              <Tab eventKey="deposit" title={
                <h6 className='tabHeading'>
                  <img src="./imges/tabledeposit.png" className="tabIcons" alt="" />
                  Deposit
                </h6>}>
                <div className="scroll">
                  <table className="table table-borderless">
                    <thead>
                      <th>Top Merchant</th>
                      <th>Amount</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Prakash Dubey</td>
                        <td>10000</td>
                      </tr>
                      <tr>
                          <td>Shyam Yadav</td>
                          <td>100000</td>
                        </tr>
                      <tr>
                        <td>Prakash Dubey</td>
                        <td>10000</td>
                      </tr>
                      <tr>
                        <td>Shyam Yadav</td>
                        <td>100000</td>
                      </tr>
                      <tr>
                        <td>Prakash Dubey</td>
                        <td>10000</td>
                      </tr>
                      <tr>
                        <td>Shyam Yadav</td>
                        <td>100000</td>
                      </tr>
                      <tr>
                        <td>Prakash Dubey</td>
                        <td>10000</td>
                      </tr>
                      <tr>
                          <td>Shyam Yadav</td>
                          <td>100000</td>
                        </tr>
                      <tr>
                        <td>Prakash Dubey</td>
                        <td>10000</td>
                      </tr>
                      <tr>
                        <td>Shyam Yadav</td>
                        <td>100000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Tab>
              <Tab eventKey="payout" title={
                <h6 className='tabHeading'>
                  <img src="./imges/tablepay.png" className="tabIcons" alt="" />
                  Payout
                </h6>}>
                <div className="scroll">
                  <table className="table table-borderless">
                    <thead>
                      <th>Top Merchant</th>
                      <th>Amount</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Prakash Dubey</td>
                        <td>10000</td>
                      </tr>
                      <tr>
                        <td>Shyam Yadav</td>
                        <td>100000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Tab>
              <Tab eventKey="settlement" title={
                <h6 className='tabHeading'>
                  <img src="./imges/tablesettle.png" className="tabIcons" alt="" />
                  Settlement
                </h6>}>
                <div className="scroll">
                  <table className="table table-borderless">
                    <thead>
                      <th>Top Merchant</th>
                      <th>Amount</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Prakash Dubey</td>
                        <td>10000</td>
                      </tr>
                      <tr>
                        <td>Shyam Yadav</td>
                        <td>100000</td>
                      </tr>
                      <tr>
                        <td>Prakash Dubey</td>
                        <td>10000</td>
                      </tr>
                      <tr>
                        <td>Shyam Yadav</td>
                        <td>100000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className="col-6">
          <div className="graphBox">
            <div className="rowHeading">
              <h2>
                <img src="./imges/bank.png" alt="" />
                Top Acquirers
              </h2>
            </div>
            <div className="newscroll">
              <table className="table table-borderless">
                <thead>
                  <th>Bank Name</th>
                  <th>Amount</th>
                </thead>
                <tbody>
                  <tr>
                      <td>SBI</td>
                      <td>&#8377; 10000</td>
                  </tr>
                  <tr>
                      <td>BOB</td>
                      <td>&#8377; 100000</td>
                  </tr>
                  <tr>
                      <td>BOI</td>
                      <td>&#8377; 10000</td>
                  </tr>
                  <tr>
                      <td>CANARA BANK</td>
                      <td>&#8377; 100000</td>
                  </tr>
                  <tr>
                      <td>PUNJAB NATIONAL BANK</td>
                      <td>&#8377; 10000</td>
                  </tr>
                  <tr>
                      <td>INDIAN BANK</td>
                      <td>&#8377; 10000</td>
                  </tr>
                  <tr>
                      <td>ICICI BANK</td>
                      <td>&#8377; 10000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-6">
          <div className="graphBox">
            <div className="rowHeading">
              <h2>
                <img src="./imges/admincurrency.png" alt="" />
                Top Currencies
              </h2>
            </div>
            <TopCurrency />
          </div>
        </div>
        <div className="col-6">
          <div className="graphBox">
            <div className="rowHeading">
              <h2>
                <img src="./imges/admincurrency.png" alt="" />
                Success Rate
              </h2>
            </div>
            <SuccessRate />
          </div>
        </div>
      </div>

      <div className="row mb-5">
        
      </div>
    </>
    
  )
}

export default Dashboard