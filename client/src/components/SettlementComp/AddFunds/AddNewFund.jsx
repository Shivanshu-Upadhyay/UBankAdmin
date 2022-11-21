import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { toast } from "react-toastify";
import axios from "axios";
import baseUrl from "../../config/baseUrl";
const AddNewFund = ({ edit, formData, fetchData }) => {
  const [open, setOpen] = React.useState(false);
  const auth = localStorage.getItem("admin");
  const [merchantList, setMerchantList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [selectMer, setSelectMer] = useState(formData?.merchant_id);
  const [merchant_name, setMerchant_name] = useState(formData?.merchant_name);
  const [selectCur, setSelectCur] = useState(formData?.currency);
  const [preBal, setPreBal] = useState(formData?.current_amount);
  const [selectAddSub, setSelectAddSub] = useState(formData?.type? String(formData?.type):"1");
  const [currBal, setCurrBal] = useState(formData?.add_amount);
  const [totalCurrBal, setTotalCurrBal] = useState(formData?.available_balance);

  const handleClickOpen = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };
    let { data } = await axios.post(
      `${baseUrl}/api/settelment/addFunds/merAndCurr`,
      {},
      config
    );
    console.log(data);
    setMerchantList(data.merchant);
    setCurrencyList(data.currency);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const selectMerAndCurr = async (val) => {
    setSelectCur(val);
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };
    let { data } = await axios.post(
      `${baseUrl}/api/settelment/addFunds/preBal`,
      { merId: selectMer, currency: val },
      config
    );
    console.log(data);
    setPreBal(data.preBal);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };
    let { data } = await axios.post(
      `${baseUrl}/api/settelment/addFunds/addFund`,
      {selectMer,merchant_name,current_amount:totalCurrBal,wallet_current_amount:totalCurrBal,addBal:currBal,option:selectAddSub,available_balance:preBal,currency:selectCur},
      config
    );
    fetchData()
    console.log(data);
    handleClose()
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };
    let { data } = await axios.post(
      `${baseUrl}/api/settelment/addFunds/updateFund`,
      {selectMer,merchant_name,current_amount:totalCurrBal,wallet_current_amount:totalCurrBal,addBal:currBal,option:selectAddSub,available_balance:preBal,currency:selectCur,id:formData.id},
      config
    );
    fetchData()
    console.log(data);
    handleClose()
  };
  const totalcurBalFun = (val) => {
    if (!selectCur || !selectMer) {
      return toast.error("Select Merchant and currency", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (selectAddSub === "1") {
      setTotalCurrBal(Number(val) + Number(preBal));
    } else {
      setTotalCurrBal(Number(preBal) - Number(val));
    }
  };

  return (
    <>
      <div>
        {edit ? (
          <div
            onClick={handleClickOpen}
            style={{ cursor: "pointer", fontWeight: "700" }}
          >
            Edit
          </div>
        ) : (
          <button className="addTransaction" onClick={handleClickOpen}>
            Add Funds
          </button>
        )}
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
            style={{
              fontWeight: "700",
              fontSize: "20px",
              background: "#1caae8",
              color: "#fff",
            }}
          >
            Add Funds
          </DialogTitle>
          <DialogContent className="mt-3">
            <form>
              <div className="row d-flex justify-content-around">
                <div className="col-6">
                  <div className="addfundBlock d-flex flex-column text-center">
                    <label>Previous Balance </label>
                    <input type="text" value={preBal} readOnly />
                  </div>
                </div>
                <div className="col-6">
                  <div className="addfundBlock d-flex flex-column text-center">
                    <label>Current Balance</label>
                    <input type="text" value={totalCurrBal} readOnly />
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-around my-3">
                <div className="col-md-12 addFundSelext">
                  <label>Select Merchant </label>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={merchantList}
                    sx={{ width: "75%" }}
                    value={merchant_name}
                    onChange={(e, val) => {setSelectMer(val.id); setMerchant_name(val.label);}}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Merchant"
                        size="small"
                        className="addfundinput"
                        required={true}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="row d-flex justify-content-around my-3">
                <div className="col-md-12 addFundSelext">
                  <label>Select Currency </label>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={currencyList}
                    sx={{ width: "75%" }}
                    value={selectCur}
                    onChange={(e, val) => {
                      selectMerAndCurr(val.label);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Currency"
                        size="small"
                        required={true}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-md-12 ">
                <div className="addfundBlockAddSub text-center">
                  <label>Add Funds</label>
                  <select
                    className="form-select form-select-sm"
                    required
                    value={selectAddSub}
                    onChange={(e) => setSelectAddSub(e.target.value)}
                    style={{ width: "100px" }}
                  >
                    <option value="1">Add(+)</option>
                    <option value="2">Sub(-)</option>
                  </select>
                  <input
                    type="text"
                    placeholder="00.00"
                    value={currBal}
                    onChange={(e) => {
                      setCurrBal(e.target.value);
                      totalcurBalFun(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="d-flex align-items-center  mt-4 justify-content-end">
                <div>
                  {formData ? (
                    <button className="addfundntn" type="submit" onClick={handleSubmit2}>
                      Update
                    </button>
                  ) : (
                    <button className="addfundntn" type="submit" onClick={handleSubmit}>
                      Add Funds
                    </button>
                  )}
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AddNewFund;
