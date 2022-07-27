import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";

function CommonMid({
  exchange_title,
  setExchange_title,
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
              Exchange title<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={exchange_title}
              onChange={(e) => setExchange_title(e.target.value)}
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
