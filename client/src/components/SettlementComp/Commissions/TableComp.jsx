import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Popover from "@mui/material/Popover";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function TableComp({ tableBodyData,tableHeading }) {
  return (
    <>
      <TableContainer className="tablecontainer2 ">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
           
            {tableHeading.map((item,i)=><TableCell key={i} style={{fontWeight:"600"}}>{item}</TableCell>)}
            </TableRow>
          </TableHead>
          
          <TableBody>
            {tableBodyData?.map((item, index) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
                >
                  <TableCell>{item.created_on}</TableCell>
                  <TableCell>{item.user_id}</TableCell>
                  <TableCell>{item.merchant_name}</TableCell>
                  <TableCell>{item.dep_commissions }</TableCell>
                  <TableCell>{item.pay_commissions }</TableCell>
                  <TableCell>{item.settle_commissions }</TableCell>
                  <TableCell>{item.currency}</TableCell>
                  <TableCell>{item.cb_commissions }</TableCell>
                  <TableCell>{item.ref_commissions }</TableCell>
                  <TableCell>{item.total_commissions }</TableCell>
                  <TableCell>{item.other_commissions }</TableCell>
                  <TableCell>{item.net_commissions }</TableCell>
                  <TableCell>{item.authorizer}</TableCell>
                  <TableCell align="center">
                    <PopUp formData={item} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const PopUp = ({ formData }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <div>
        <img
          src="https://www.bankconnect.online/assets/merchants/img/more-v.svg"
          alt=""
          className="mx-2"
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
        >
          <div style={{ padding: "10px 20px" }}>
            <DialogOpenModel formData={formData} />
          </div>
        </Popover>
      </div>
    </>
  );
};

const DialogOpenModel = ({ formData }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div>
        <h6
          onClick={handleClickOpen}
          style={{ cursor: "pointer", fontWeight: "700", marginTop: "10px" }}
        >
          View 
        </h6>
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
            Transactions View
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-12 dialogBlock1">
                <form action="" className="row justify-content-around">
                  <div className=" col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      ID Invoice
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.order_no}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Telephone
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.i_number}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Email
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.i_email}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Name
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.i_flname}
                    />
                  </div>
                  <hr style={{ width: "95%" }} />
                  <div className="col-md-4 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Payment Method
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.payment_type}
                    />
                  </div>
                  <div className="col-md-4 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Transaction Date
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.created_on}
                    />
                  </div>
                  <div className="col-md-4 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Settled Date
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.settlement_on}
                    />
                  </div>

                  <hr style={{ width: "95%" }} />

                  <div className=" col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Gross Amount
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.ammount}
                    />
                  </div>
                  <div className=" col-md-4 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Rolling Reserve Amount
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.rolling_reverse_amount}
                    />
                  </div>
                  <div className=" col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Commissions
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.payin_charges}
                    />
                  </div>
                  <div className=" col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Net Amount
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.settle_amount}
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Settled Amount
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.settle_amount}
                    />
                  </div>

                  <hr style={{ width: "95%" }} />

                  <div className="col-md-3 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Sold By
                    </label>
                    <input type="text" className="input1" value="" />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Card
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.payment_type}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Card No.
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.card_4_4}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Message
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.discription}
                    />
                  </div>
                  <hr style={{ width: "95%" }} />
                  <div className="col-md-3">
                    <div
                      onClick={handleClose}
                      className="dilogfirstbutton d-flex justify-content-center align-items-center"
                    >
                      <img
                        src="https://www.bankconnect.online/assets/merchants/img/dollor.svg"
                        alt=""
                        width="45px"
                      />
                      <div className="mx-2">
                        <h6 style={{ color: "#000009" }}>Amount</h6>
                        <h6 style={{ fontWeight: "600", fontSize: "18px" }}>
                          {formData.settle_amount}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 d-flex align-items-center justify-content-end">
                    <div>
                      <span onClick={handleClose} className="dilogrefund">
                        Refund Transaction
                      </span>
                      <span onClick={handleClose} className="dilogrefund mx-3">
                        Close
                      </span>
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
