import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import baseUrl from "../../config/baseUrl";
const AddNewFund = ({ edit, readData, fetchData }) => {
  const [open, setOpen] = React.useState(false);
  const auth = localStorage.getItem("admin");

  const [formDataAll, setFormDataAll] = useState({
    id: readData?.id,
    merchantId: readData?.user_id,
    merchantName: readData?.mer_name,
    Currency: readData?.currency,
    bankName: readData?.bank_name,
  });
  const handleChange = (e) => {
    setFormDataAll({ ...formDataAll, [e.target.name]: e.target.value });
  };

  const handleClickOpen = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };
    let { data } = await axios.post(
      `${baseUrl}/api/settelment/bankDeposit/createAndUpdate`,
      {},
      config
    );
    setFormDataAll({ ...formDataAll, authorizer: data.authorizer });

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
   
   
  ];

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
            <form action="">
              <div className="row d-flex justify-content-around">
                <div className="col-6">
                  <div className="addfundBlock d-flex flex-column text-center">
                    <label>Previous Balance </label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="addfundBlock d-flex flex-column text-center">
                    <label>Current Balance</label>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-around my-3">
                <div className="col-md-12 addFundSelext">
                  <label>Select Merchant </label>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    sx={{ width: '75%' }}
                    renderInput={(params) => (
                      <TextField {...params} label="Merchant" size="small" className="addfundinput" />
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
                    options={top100Films}
                    sx={{ width: '75%' }}
                    renderInput={(params) => (
                      <TextField {...params} label="Currency" size="small" />
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
                      style={{width:"100px"}}
                    >
                      <option>
                       Add(+)
                      </option>
                      <option >
                        Sub(-)
                      </option>
                      
                    </select>
                    <input type="text" value="00.00" />
                  </div>
                </div>

              

              <div className="d-flex align-items-center  mt-4 justify-content-end">
              <div>
              {readData? <button className="addfundntn" type="submit">
                Update
              </button>:<button className="addfundntn" type="submit">
                Add Funds 
              </button>}
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
