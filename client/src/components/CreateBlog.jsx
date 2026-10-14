import React, { useState } from "react";
import { BASE_URL, token } from "../utils/config";

const CreateBlog = () => {
  const [blog, setBlog] = useState({
    title: undefined,
    topic: undefined,
    image: undefined,
    content: undefined,
  });
  const handleChnage = (e) => {
    setBlog((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/blog/createblog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blog),
      });
      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
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

          <button type="submit" className="btn btn-success mt-2">
            Create Blog
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
