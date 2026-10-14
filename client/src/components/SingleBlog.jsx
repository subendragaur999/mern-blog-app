import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/config";
import { Link, useParams } from "react-router-dom";

const SingleBlog = () => {
  const [blogData, setBlogData] = useState([]);

  const { id } = useParams();

  const getBlogData = async () => {
    const res = await fetch(`${BASE_URL}/blog/getsingleblog/${id}`);
    const { data } = await res.json();
    setBlogData(data);
  };

  useEffect(() => {
    getBlogData();
  }, []);

  //   Conditional rendering is task
  return (
    <>
      <img src={blogData.image} alt="" />
      <h1>{blogData.title}</h1>
      <p>{blogData.content}</p>
      <Link to={`/editblog/${id}`}>
        <button className="btn btn-warning">Edit Blog</button>
      </Link>
    </>
  );
};

export default SingleBlog;
