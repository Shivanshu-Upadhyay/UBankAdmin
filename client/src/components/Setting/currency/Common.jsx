import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";

function CommonMid({
  deposit_currency,
  setDeposit_currency,
  settled_currency,
  setSettled_currency,
  rate,
  setRate,
  handleSubmit,
  buttonText,
}) {
  return (
    <>
      <div className="box">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Deposit Currency<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={deposit_currency}
              onChange={(e) => setDeposit_currency(e.target.value)}
            />
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Settled Currency<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={settled_currency}
              onChange={(e) => setSettled_currency(e.target.value)}
            />
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Rate<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
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

export default CommonMid;
