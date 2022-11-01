import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import axios from 'axios'
import baseUrl from "../../config/baseUrl";
const AddTransaction = ({ReadOnlyVal,formData}) => {
  const [open, setOpen] = React.useState(false);
  const [merchantIdList,setMerchantIdList] =useState([])
  const [bankList,setBankList] =useState([])
  const auth = localStorage.getItem("admin");
  let today = new Date(); 
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time; 

  const [formDataAll,setFormDataAll] = useState({
    merchantId:'',
    merchantName:'',
    receivedDate:dateTime,
    Currency:'',
    bankName:'',
    TransactionType:'',
    transactionid:Date.now(),
    depositsReceived:'',
    BankCharges:'',
    Tax:'',
    TotalCharges:"",
    authorizer:'',
    NetDepositsReceived:12
  })
  const handleChange = (e)=>{
    setFormDataAll({...formDataAll,[e.target.name]:e.target.value})
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(formDataAll);
    handleClose()
  }
  const handleClickOpen = async() => {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
      }
      let {data} = await axios.post(`${baseUrl}/api/settelment/bankDeposit/createAndUpdate`,{}, config);
      console.log(data);
      setFormDataAll({...formDataAll,"authorizer":data.authorizer})
      setMerchantIdList(data.merchant)
      setBankList(data.bankName)
      setOpen(true); 
  };
  const handleClose = () => {
    setOpen(false);
  };
const setMerchantNameFun = (e)=>{
  setFormDataAll({...formDataAll,"merchantName": merchantIdList?.filter((item)=>item.id+''===e.target.value)[0].name,[e.target.name]:e.target.value})
  
}
  return (
    <>
      <div>
      {ReadOnlyVal? <div onClick={handleClickOpen} style={{ cursor:"pointer",padding:"10px 20px",fontWeight:"700"}} >View</div> :<button className="addTransaction" onClick={handleClickOpen}>
          <AddIcon />
          Add Transaction 
        </button>}
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={false}
          maxWidth={"md"}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{ fontWeight: "700", fontSize: "20px" }}
          >
           Bank Deposits Received
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-12 dialogBlock1">
                <form action="" className="row justify-content-around">
                  <div className=" col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Merchant Id
                    </label>
                    <div className="d-flex justify-content-center align-items-center">
                    <select
                      className="form-select form-select-sm mb-3 boldOption text-center"
                      name="merchantId"
                      style={{width:"100px"}}
                      onChange={(e)=>{setMerchantNameFun(e)}}
                      value={formDataAll.merchantId}
                    >
                      <option value="default">
                        Please Select
                      </option>
                      {merchantIdList?.map(item=> <option value={item.id} key={item.id}>{item.id}</option>)}
                    </select>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Merchant Name
                    </label>
                    <input type="text" className="input1" name="merchantName" value={formDataAll.merchantName} readOnly/>
                  </div>

                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Received Date
                    </label>
                    <input type="email" className="input1" name="receivedDate" readOnly value={formDataAll?.receivedDate}/>
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Currency
                    </label>
                    <div className="d-flex justify-content-center align-items-center">
                    <select
                      className="form-select form-select-sm mb-3 boldOption text-center"
                      name="Currency"
                      defaultValue={"default"}
                      style={{width:"100px"}}
                      onChange={handleChange}
                      value={formDataAll?.Currency}
                    >
                      <option value="default" >
                        Please Select
                      </option>
                      <option value="INR">INR</option>
                      <option value="CNY">CNY</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="USDT">USDT</option>
                      <option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                      <option value="THB">THB</option>
                      <option value="VND">VND</option>
                      <option value="PHP">PHP</option>
                      <option value="MYR">MYR</option>
                      <option value="IDR">IDR</option>
                      <option value="KRW">KRW</option>
                    </select>
                    </div>
                  </div>
                  <hr style={{ width: "95%" }} />
                  <div className=" col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                     Bank Name 
                    </label>
                    <div className="d-flex justify-content-center align-items-center">
                    <select
                      className="form-select form-select-sm mb-3 boldOption text-center"
                      name="bankName"
                      defaultValue={"default"}
                      style={{width:"100px"}}
                      onChange={handleChange}
                      value={formDataAll?.bankName}
                    >
                      <option value="default">
                      Please  Select
                      </option>
                      {bankList?.map(item=> <option value={item.id} key={item.id}>{item.gateway_name}</option>)}
                    </select>
                    </div>
                    
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                     Transaction Type
                    </label>
                    <div className="d-flex justify-content-center align-items-center">
                    <select
                      className="form-select form-select-sm mb-3 boldOption text-center"
                      name="TransactionType"
                      defaultValue={"default"}
                      style={{width:"100px"}}
                      onChange={handleChange}
                      value={formDataAll?.TransactionType}
                    >
                      <option value="default" >
                        Please Select
                      </option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="CRYPTO">CRYPTO</option>
                      
                      
                    </select>
                    </div>
                  </div>

                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "800", color: "#000" }}
                    >
                    Transaction id
                    </label>
                    <input type="email" className="input1" name="transactionid" readOnly value={formDataAll?.transactionid} />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                    Deposits Received
                    </label>
                    <input type="text" className="input1" name="depositsReceived" onChange={handleChange} value={formDataAll.depositsReceived}/>
                  </div>
                  <hr style={{ width: "95%" }} />
                  <div className=" col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                     Bank Charges
                    </label>
                    <input type="text" className="input1" name="BankCharges" onChange={handleChange} value={formDataAll?.BankCharges}/>
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                     Tax
                    </label>
                    <input type="text" className="input1" name="Tax" onChange={handleChange} value={formDataAll?.Tax}/>
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Total Charges
                    </label>
                    <input type="email" className="input1" name="TotalCharges" onChange={handleChange} value={formDataAll?.TotalCharges}/>
                  </div>
                  
                  
                  <div className=" col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Authorizer
                    </label>
                    <input type="text" className="input1" name="authorizer"  value={formDataAll?.authorizer} readOnly/>
                  </div>
                  
                  <hr style={{ width: "95%" }} />
             <div className="d-flex justify-content-between align-items-center">

              <div className="totalBankdeposite d-flex align-items-center"> 
              <img src="https://www.payoway.com/web/assets/merchants/img/dollor.svg" alt="" width="50px" height="50px"/>
              <div className="ms-2">
                <h6>Net Deposits Received</h6>
                <input type="text" style={{border:"none",outline:"none",backgroundColor:"#d2eefa",fontWeight:"bold",width:"90%" }} value={formDataAll?.NetDepositsReceived} readOnly />
              </div>
              </div>
              <div>
              {formData? <button className="addTransaction" onClick={handleClose} type='submit'>
                Close
              </button>:<button className="addTransaction" onClick={(e)=>handleSubmit(e)} type='submit'>
                Create 
              </button>}
              </div>
             
           
              
              </div>
                </form>
              </div>
              
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};




export default AddTransaction