import React, { useState } from "react";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
function Login() {
  const {setIsLoginUser,setActive,setToggel, setRole } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      let result = await axios.post(`${baseUrl}/login`, formData, config);
      console.log(result.data);
      if (result.data.token && (result.data.role===1||result.data.role===2)) {
        navigate("/");
        setIsLoginUser(result.data.token);
        setRole(result.data.role)
        localStorage.setItem("admin", result.data.token);
        localStorage.setItem("role", result.data.role);
        setToggel(true);
        setActive(-1);
      } else {
        toast.error(result.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error("Somthing went wrong", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    }
  };
  return (
    <>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 quote-section">
              <div className="blockquote">
                <p className="blockquote-text">Welcome to UbankConnect </p>
                <footer className="blockquote-footer">Read More</footer>
              </div>
            </div>
            <div className="col-sm-6 form-section">
              <div className="login-wrapper text-center">
                <div className="login-img">
                  <img
                    src="https://www.akonto.co//assets/frontend/images/logo.png"
                    alt=""
                    width="100px"
                  />
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button className="btn btn-block login-btn" type="submit">
                    Login
                  </button>
                </form>
                <a href="#!" className="forgot-password-link">
                  Forgot Your Password?
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
