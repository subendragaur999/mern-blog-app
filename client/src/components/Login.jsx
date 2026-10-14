import React, { useContext, useState } from "react";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChnage = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(credentials),
        headers: { "content-type": "application/json" },
      });
      const result = await res.json();
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: result.data,
        token: result.token,
        role: result.role,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(credentials);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Enter your email"
                id="email"
                onChange={handleChnage}
              />
              <input
                type="password"
                className="form-control mt-2"
                placeholder="Enter your password"
                id="password"
                onChange={handleChnage}
              />

              <button className="btn btn-info mt-2" type="submit">
                Login
              </button>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
