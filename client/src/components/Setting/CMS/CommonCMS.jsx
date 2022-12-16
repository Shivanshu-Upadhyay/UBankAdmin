import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";
import { CKEditor } from 'ckeditor4-react';

function CommonCMS({
  page_title,
  setPage_title,
  content,
  setContent,
  handleSubmit,
  buttonText,
}) {
  return (
    <>
      <div className="box">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Page title<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={page_title}
              onChange={(e) => setPage_title(e.target.value)}
            />
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Content<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <CKEditor
              initData={content}
            />
            {/* <Form.Control
              type="text"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            /> */}
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

export default CommonCMS;
