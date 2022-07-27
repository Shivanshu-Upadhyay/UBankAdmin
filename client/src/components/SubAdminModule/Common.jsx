import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";
import baseUrl from "../config/baseUrl";
import axios from "axios";
function Common({
  fname,
  setFname,
  lname,
  setLname,
  email,
  setEmail,
  password,
  setPassword,
  role,
  setRole,
  handleSubmit,
  buttonText,
}) {
  const auth = localStorage.getItem("admin");
  const [roleType, setRoleType] = React.useState([]);
  const roleFunc = async () => {
    try {
      let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(`${baseUrl}/getRole`, formData, config);
      setRoleType(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    roleFunc();
  }, []);
  return (
    <>
      <div className="box">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              First Name<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </Form.Group>{" "}
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Last Name<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </Form.Group>{" "}
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Enter your email address<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>{" "}
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Password<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Select Role<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="select">Select</option>
              {roleType.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.role_name}
                  </option>
                );
              })}
            </Form.Select>
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

export default Common;
