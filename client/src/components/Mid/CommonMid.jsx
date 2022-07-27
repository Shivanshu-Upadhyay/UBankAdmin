import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";

function CommonMid({
  title,
  setTitle,
  mid,
  setMid,
  sec_key,
  setSec_key,
  iv,
  setIv,
  merchant_url,
  setMerchant_url,
  merchant_otherurl,
  setMerchant_otherurl,
  handleSubmit,
  buttonText,
}) {
  return (
    <>
      <div className="box">
        <Form onSubmit={(e)=>handleSubmit(e)}>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Title<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Mer. No<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="text" value={mid} onChange={(e)=>setMid(e.target.value)}/>
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              key<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="text"  value={sec_key} onChange={(e)=>setSec_key(e.target.value)}/>
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              IV<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="text"  value={iv} onChange={(e)=>setIv(e.target.value)}/>
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Merchant First URL<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="text"  value={merchant_url} onChange={(e)=>setMerchant_url(e.target.value)}/>
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Merchant Second URL<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="text"  value={merchant_otherurl} onChange={(e)=>setMerchant_otherurl(e.target.value)}/>
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
