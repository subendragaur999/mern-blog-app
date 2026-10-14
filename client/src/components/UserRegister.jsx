import React, { useState } from "react";
import { BASE_URL } from "../utils/config";
import { toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const [credentials, setCredentials] = useState({
    name: undefined,
    email: undefined,
    password: undefined,
    phone: undefined,
    profile: undefined,
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/registeruser`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: { "content-type": "application/json" },
      });
      const result = await res.json();

      navigate("/login");

      if (res.ok) {
        toast.success(result.message || "User registered successfully!");
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Network error, please try again!");
      console.error(error);
    }
  };

  const handlechange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

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
                placeholder="Enter user name"
                id="name"
                onChange={handlechange}
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Enter user profile pic URL"
                id="profile"
                onChange={handlechange}
              />
              <input
                type="password"
                className="form-control mt-2"
                placeholder="Enter user password"
                id="password"
                onChange={handlechange}
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Enter user email"
                id="email"
                onChange={handlechange}
              />
              <input
                type="number"
                className="form-control mt-2"
                placeholder="Enter user contact number"
                id="phone"
                onChange={handlechange}
              />
              <button className="btn btn-info" type="submit">
                Create Account
              </button>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default UserRegister;
