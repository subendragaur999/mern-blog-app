import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import SingleBlog from "../components/SingleBlog";
import UserRegister from "../components/UserRegister";
import Login from "../components/Login";
import CreateBlog from "../components/CreateBlog";
import Updateblog from "../components/Updateblog";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/login" element={<Login />} />
      <Route path="/createblog" element={<CreateBlog />} />
      <Route path="/singleblog/:id" element={<SingleBlog />} />
      <Route path="/editblog/:id" element={<Updateblog />} />
    </Routes>
  );
};

export default Routing;
