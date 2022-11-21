import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Popover from "@mui/material/Popover";
import AddNewFund from "./AddNewFund";

export default function TableComp({ tableBodyData, setXlData,tableHeading ,fetchData}) {
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
                   
                  <TableCell>{item.merchant_id}</TableCell>
                  <TableCell>{item.merchant_name}</TableCell>
                  <TableCell>{item.currency}</TableCell>
                  <TableCell>{item.available_balance}</TableCell>
                  <TableCell>{Number(item.type)===1?"+":"-"}{item.add_amount}</TableCell>
                  <TableCell>{item.current_amount}</TableCell>
                  <TableCell>{item.funds_added_by} </TableCell>
                  <TableCell>{item.created_on}</TableCell>
                  <TableCell align="center">
                    <PopUp formData={item} fetchData={fetchData} />
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

const PopUp = ({ formData,fetchData }) => {
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
            <AddNewFund formData={formData} edit={true} fetchData={fetchData}/>
          </div>
        </Popover>
      </div>
    </>
  );
};
