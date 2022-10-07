import React, { useState } from 'react'
import Card from '../../../commonComp/Card/Card'
import TableComp from './TableComp'
function BankDeposit() {
  const [xlData,setXlData]= useState([])
    const data =[
        {name: 'Declined', percentage: 2, amount: 400002},
        {name: 'Success', percentage: 24, amount: 222700040},
        {name: 'Refund', percentage: 0, amount: null},
        {name: 'Chargeback', percentage: 0, amount: 1}]
 const tableBodyData = [
   
   {
       id:1,
       name:"ram"
     },
   {
       id:2,
       name:"mohan"
     },
    ]

const tableHeading = ['Merchant Id','Merchant Name','Transaction id','Received Date','Currency','Bank Name','Transaction Type','Deposits Received','Bank Charges','Tax','Total Charges','Net Deposits Received','Authorizer','Action']

  return (
    <>
    <section> <Card carddata={data}/>
    <br />
    <TableComp setXlData={setXlData} tableHeading={tableHeading} tableBodyData={tableBodyData}/>
    </section>
    
    </>
  )
}

export default BankDeposit