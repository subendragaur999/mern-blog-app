import React, { useState } from "react";
import { BASE_URL, token } from "../utils/config";
import { useNavigate, useParams } from "react-router-dom";

const Updateblog = () => {
  const [blogs, setBlogs] = useState({
    title: undefined,
    topic: undefined,
    content: undefined,
    image: undefined,
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/blog/editblog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogs),
    });

    const result = await res.json();
    console.log(result);
    navigate("/");
  };

  const handleChnage = (e) => {
    setBlogs((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center">Create Blog</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Enter Blog Title"
            id="title"
            onChange={handleChnage}
          />
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Enter Blog Topic"
            id="topic"
            onChange={handleChnage}
          />
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Enter Blog Image URL"
            id="image"
            onChange={handleChnage}
          />
          <textarea
            rows="9"
            className="form-control mt-2"
            placeholder="Enter Blog Content"
            id="content"
            onChange={handleChnage}
          ></textarea>

          <button type="submit" className="btn btn-dark mt-2">
            Update Blog
          </button>
        </form>
      </div>
    </>
  );
};

export default Updateblog;
