import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";

function CommonBanner({
  title,
  setTitle,
  image,
  setImage,
  handleSubmit,
  buttonText,
}) {
  return (
    <>
      <div className="box">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Title<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Image<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <div className="input-group">  
              <div className="custom-file">  
                <input type="file" className="custom-file-input" id="inputGroupFile01"  
                  aria-describedby="inputGroupFileAddon01" value={image} onChange={(e) => setImage(e.target.value)} />  
              </div>  
            </div> 
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

export default CommonBanner;
