import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Popover from "@mui/material/Popover";
import AddTransaction from "./AddTransaction";

export default function TableComp({ tableBodyData, setXlData,tableHeading,fetchData }) {
  const [users, setUsers] = useState(tableBodyData);
 useEffect(()=>{
  setUsers(tableBodyData)
 },[tableBodyData])
  
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
      setXlData(tempUser);
    } else {
      let tempUser = users.map((user) =>  user.recieved_date === name ? { ...user, isChecked: checked } : user);
      setUsers(tempUser);
      setXlData(tempUser.filter((item) => item.isChecked));
    } 
  };
 

  return (
    <>
      <TableContainer className="tablecontainer2 ">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="allSelect"
                  checked={!users?.some((user) => user?.isChecked !== true)}
                  onChange={handleChange}
                />
              </TableCell>
            {tableHeading?.map((item,i)=><TableCell key={i} style={{fontWeight:"600"}}>{item}</TableCell>)}
            </TableRow>
          </TableHead>
          
          <TableBody>
            {users?.map((item, index) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
                >
                   <TableCell>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name={item.recieved_date}
                      checked={item?.isChecked || false}
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.mer_name}</TableCell>
                  <TableCell>{item.trx_id}</TableCell>
                  <TableCell>{item.recieved_date}</TableCell>
                  <TableCell>{item.currency}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.trx_type}</TableCell>
                  <TableCell>{item.deposit_recieved}</TableCell>
                  <TableCell>{item.bank_charge}</TableCell>
                  <TableCell>{item.tax}</TableCell>
                  <TableCell>{item.total_charges}</TableCell>
                  <TableCell>{item.deposit_recieved}</TableCell>
                  <TableCell>{item.auth}</TableCell>
                  <TableCell align="center">
                    <PopUp formData={item} fetchData={fetchData}/>
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
            <AddTransaction readData={formData} edit={true} fetchData={fetchData}  />
          </div>
        </Popover>
      </div>
    </>
  );
};


