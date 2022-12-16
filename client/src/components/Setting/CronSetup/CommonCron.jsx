import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";
import Header from "../../../commonComp/Header/Header";

function CommonCron({
  additional_charges,
  setAdditional_charges,
  handleSubmit,
  buttonText,
}) {
    return (
        <>
            <div className="formBox">
            <Header title="Additional Charges" path="/Cron" />
                <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group style={{ marginTop: "10px" }}>
                    <Form.Label>
                        Additional Charges<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                    type="text"
                    value={additional_charges}
                    onChange={(e) => setAdditional_charges(e.target.value)}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    style={{
                    borderRadius: "20px",
                    marginTop: "20px",
                    color: "#fff",
                    background: "#ff6600",
                    display: "flex",
                    marginLeft: "auto",
                    }}
                >
                    {buttonText}
                </Button>
                </Form>
            </div>
        </>
    );
}

export default CommonCron;
