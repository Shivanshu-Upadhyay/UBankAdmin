import React, { useEffect, useState } from 'react'
import Card from '../../../commonComp/Card/Card'
import FilterDateMax from '../../../commonComp/filterDateMax/FilterDateMax'
import TableComp from './TableComp'
import styles from './style.module.css'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PaginationComp from '../../../commonComp/Pagination/PaginationComp'
import {localPayouts} from '../../../Api/http'
import SearchItem from '../../../commonComp/SearchItem/SearchItem'
import * as XLSX from "xlsx";
function LocalPayouts() {
  const [page,setPage]=useState(1)
  const [totalPage,setTotalPage]=useState(1)
  const [tableBodyData,setTableBodyData] = useState([])
  const [date,setDate] = useState('')
  const [to,setTo] = useState('')
  const [from,setFrom] = useState('')
  const [searchItem,setSearchItem] = useState('')
    const data =[
        {name: 'Declined', percentage: 72, amount: 4002},
        {name: 'Success', percentage: 24, amount: 222040},
        {name: 'Refund', percentage: 30, amount: 890},
        {name: 'Chargeback', percentage: 60, amount: 8091}]
 
    const fetchData = async()=>{
      try {
      const values = {pageNumber:page,date,to,from,searchItem}
      const {data} = await  localPayouts(values)
      console.log(data);
      setTableBodyData(data.result)
      setTotalPage(data.numOfPages)
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
      fetchData()
    },[page,date,to,from,searchItem])

    const downloadExl = () => {
      const workSheet = XLSX.utils.json_to_sheet(tableBodyData);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "Deposit");
      // Buffer
      let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
      // Binary String
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      // Download
      XLSX.writeFile(workBook, "Download.xlsx");
    };

     const tableHeading = ['AC.Type','Bank','Payout Id','Customer Payout Id','Merchant','Status','Message','UTR','Trx Type','Payee','Credit Acc','IFSC','Amount','Remark','Payout Charge','GST Charge','Bank Charge','Wallet Deduct','Currency','Create','Update']

  return (
    <section> 
    <h4 style={{fontWeight:"bold",marginBottom:"20px"}}>Local Payouts</h4>
    <Card carddata={data}/>
    <br /> <br />
    {/* FILTER SECTION */}
    <div className="row align-items-center justify-content-end">
      <div className="col-8 row align-items-center justify-content-around">
        <div className='col-5'> <SearchItem searchItem={searchItem} setSearchItem={setSearchItem}  /> </div>
        <div className="col-3 centerDiv"><FilterDateMax setDate={setDate} setTo={setTo} setFrom={setFrom}/></div>
        <div className="col-3 centerDiv"> <button className={styles.addTransaction} onClick={downloadExl}><ArrowDownwardIcon />Download</button></div>
      </div>
    </div>
     {/* FILTER SECTION END*/}
    <br /><br />
    <TableComp  tableHeading={tableHeading} tableBodyData={tableBodyData}/>
    <PaginationComp
          setPage={setPage}
          page={page}
          totalPage={totalPage}
          message={`Showing 10 from data ${totalPage}`}
        />
    </section>
    
  
  )
}

export default LocalPayouts