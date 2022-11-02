import React, { useEffect, useState } from 'react'
import Card from '../../../commonComp/Card/Card'
import FilterDateMax from '../../../commonComp/filterDateMax/FilterDateMax'
import TableComp from './TableComp'
import styles from './style.module.css'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PaginationComp from '../../../commonComp/Pagination/PaginationComp'
import * as XLSX from "xlsx";
import SearchItem from '../../../commonComp/SearchItem/SearchItem'
import AddTransaction from './AddTransaction'
import axios from 'axios'
import baseUrl from '../../config/baseUrl'
function BankDeposit() {
  const [page,setPage]=useState(1)
  const [totalPage,setTotalPage]=useState(1)
  const [tableBodyData,setTableBodyData] = useState([])
  const [date,setDate] = useState('')
  const [to,setTo] = useState('')
  const [from,setFrom] = useState('')
  const [searchItem,setSearchItem] = useState('')
  const [xlsxData,setXlData] = useState([])
  const auth = localStorage.getItem("admin");
  const data =[
    {name: 'Declined', percentage: 2, amount: 400002},
    {name: 'Success', percentage: 24, amount: 222700040},
    {name: 'Refund', percentage: 0, amount: null},
    {name: 'Chargeback', percentage: 0, amount: 1}]
    const fetchData = async()=>{
      try {
      const values = {pageNumber:page,date,to,from,searchItem}
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      const {data} = await axios.post(`${baseUrl}/api/settelment/bankDeposit`, values, config)
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
      const workSheet = XLSX.utils.json_to_sheet(xlsxData);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "Deposit");
      // Binary String
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      // Download
      XLSX.writeFile(workBook, "BankDeposit.xlsx");
    };

const tableHeading = ['Merchant Id','Merchant Name','Transaction id','Received Date','Currency','Bank Name','Transaction Type','Deposits Received','Bank Charges','Tax','Total Charges','Net Deposits Received','Authorizer','Action']

  return (
    
    <section> 
    <h4 style={{fontWeight:"bold",marginBottom:"20px"}}>Bank Deposit Received</h4>
    <Card carddata={data}/>
    <br /> <br />
    {/* FILTER SECTION */}
    <div className="row align-items-center justify-content-end">
      <div className="col-9 row align-items-center justify-content-around">
        <div className='col-4'> <SearchItem searchItem={searchItem} setSearchItem={setSearchItem}  /> </div>
        <div className="col-3 centerDiv"><FilterDateMax setDate={setDate} setTo={setTo} setFrom={setFrom}/></div>
        <div className="col-3 centerDiv"> <AddTransaction fetchData={fetchData} /></div>
        <div className="col-2 centerDiv"> <button className={styles.addTransaction} onClick={downloadExl}><ArrowDownwardIcon  />Download</button></div>
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