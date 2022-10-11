import React, { useEffect, useState } from 'react'
import Card from '../../../commonComp/Card/Card'
import FilterDateMax from '../../../commonComp/filterDateMax/FilterDateMax'
import TableComp from './TableComp'
import styles from './style.module.css'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchIcon from '@mui/icons-material/Search';
import PaginationComp from '../../../commonComp/Pagination/PaginationComp'
import {bankDeposit} from '../../../Api/http.js'
function BankDeposit() {
  const [xlData,setXlData]= useState([])
  const [totalPage,setTotalPage]=useState(1)
  const [page,setPage]=useState(1)
  const [tableBodyData,setTableBodyData] = useState([])
    const data =[
        {name: 'Declined', percentage: 2, amount: 400002},
        {name: 'Success', percentage: 24, amount: 222700040},
        {name: 'Refund', percentage: 0, amount: null},
        {name: 'Chargeback', percentage: 0, amount: 1}]
 

const fetchData = async()=>{
  try {
  const {data} = await  bankDeposit()
  console.log(data);
  setTableBodyData(data.result)
  setTotalPage(data.numOfPages)
  } catch (error) {
    console.log(error);
  }
}

useEffect(()=>{
  fetchData()
},[])

const tableHeading = ['Merchant Id','Merchant Name','Transaction id','Received Date','Currency','Bank Name','Transaction Type','Deposits Received','Bank Charges','Tax','Total Charges','Net Deposits Received','Authorizer','Action']

  return (
    
    <section> 
    <h4 style={{fontWeight:"bold",marginBottom:"20px"}}>Bank Deposit Received</h4>
    
    <Card carddata={data}/>
    <br /> <br />
    {/* FILTER SECTION */}
    <div className="row align-items-center justify-content-end">
      <div className="col-9 row align-items-center justify-content-around">
        <div className='col-4'> <div className={styles.bankSearch}><SearchIcon className='mx-2' /> <input type="search" className={styles.inputSearch}/></div> </div>
        <div className="col-3 centerDiv"><FilterDateMax /></div>
        <div className="col-3 centerDiv"> <button className={styles.addTransaction}>Add Transaction </button></div>
        <div className="col-2 centerDiv"> <button className={styles.addTransaction}><ArrowDownwardIcon />Download</button></div>
      </div>
    </div>
     {/* FILTER SECTION END*/}
    <br /><br />
    <TableComp setXlData={setXlData} tableHeading={tableHeading} tableBodyData={tableBodyData}/>
    <PaginationComp
          setPage={setPage}
          page={page}
          totalPage={totalPage}
          message={`Showing 10 from data ${totalPage}`}
        />
    </section>
    
  
  )
}

export default BankDeposit