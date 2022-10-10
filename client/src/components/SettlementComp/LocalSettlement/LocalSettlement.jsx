import React, { useState } from 'react'
import Card from '../../../commonComp/Card/Card'
import FilterDateMax from '../../../commonComp/filterDateMax/FilterDateMax'
import TableComp from './TableComp'
import styles from './style.module.css'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchIcon from '@mui/icons-material/Search';
import PaginationComp from '../../../commonComp/Pagination/PaginationComp'
function LocalSettlement() {
  const [xlData,setXlData]= useState([])
  const [page,setPage]=useState(1)
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



const tableHeading = ['Final Authorization','Admin Status','Settlement Date','Merchant Id','Merchant Name','Source','Settlement Id','Settlement Type','Bank Name','From Currency','Exchange Rate','Amount ','Settlement Fee','Net Amount For Settlement','Settlement Amount	','Action']

  return (
    
    <section> 
    <h4 style={{fontWeight:"bold",marginBottom:"20px"}}>Local Settlement Transactions</h4>
    
    <Card carddata={data}/>
    <br /> <br />
    {/* FILTER SECTION */}
    <div className="row align-items-center justify-content-end">
      <div className="col-9 row align-items-center justify-content-around">
        <div className='col-4'> <div className={styles.bankSearch}><SearchIcon className='mx-2' /> <input type="search" className={styles.inputSearch}/></div> </div>
        <div className="col-3 centerDiv"><FilterDateMax /></div>
        <div className="col-3 centerDiv"> <button className={styles.addTransaction}>Request Settlement  </button></div>
        <div className="col-2 centerDiv"> <button className={styles.addTransaction}><ArrowDownwardIcon />Download</button></div>
      </div>
    </div>
     {/* FILTER SECTION END*/}
    <br /><br />
    <TableComp setXlData={setXlData} tableHeading={tableHeading} tableBodyData={tableBodyData}/>
    <PaginationComp
          setPage={setPage}
          page={page}
          totalPage={10}
          message={"Showing 10 from data 44311"}
        />
    </section>
    
  
  )
}

export default LocalSettlement