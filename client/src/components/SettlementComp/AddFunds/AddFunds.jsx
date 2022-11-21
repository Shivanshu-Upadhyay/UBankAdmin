import React, { useEffect, useState } from 'react'
import Card from '../../../commonComp/Card/Card'
import FilterDateMax from '../../../commonComp/filterDateMax/FilterDateMax'
import TableComp from './TableComp'
import PaginationComp from '../../../commonComp/Pagination/PaginationComp'
import axios from 'axios'
import baseUrl from '../../config/baseUrl'
import SearchItem from '../../../commonComp/SearchItem/SearchItem'
import AddNewFund from './AddNewFund'
function AddFunds() {
  const [page,setPage]=useState(1)
  const [totalPage,setTotalPage]=useState(1)
  const [tableBodyData,setTableBodyData] = useState([])
  const [date,setDate] = useState('')
  const [to,setTo] = useState('')
  const [from,setFrom] = useState('')
  const [searchItem,setSearchItem] = useState('')
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
      const {data} = await axios.post(`${baseUrl}/api/settelment/addFundRead`, values, config)
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
      
const tableHeading = ['Merchant Id','Merchant','Currency','Previous Balance','Amount Added','Current Balance','Funds added by',' Time & Date','Action']

  return (
    
    <section> 
    <h4 style={{fontWeight:"bold",marginBottom:"20px"}}>Add Funds</h4>
    <Card carddata={data}/>
    <br /> <br />
    {/* FILTER SECTION */}
    <div className="row align-items-center justify-content-end">
      <div className="col-9 row align-items-center justify-content-around">
        <div className='col-5'> <SearchItem searchItem={searchItem} setSearchItem={setSearchItem}  /> </div>
        <div className="col-3 centerDiv"><FilterDateMax setDate={setDate} setTo={setTo} setFrom={setFrom}/></div>
        <div className="col-3 centerDiv"> <AddNewFund fetchData={fetchData}/></div>
      </div>
    </div>
     {/* FILTER SECTION END*/}
    <br /><br />
    <TableComp  tableHeading={tableHeading} tableBodyData={tableBodyData} fetchData={fetchData}/>
    <PaginationComp
          setPage={setPage}
          page={page}
          totalPage={totalPage}
          message={`Showing 10 from data ${totalPage}`}
        />
    </section>
    
  
  )
}
export default AddFunds