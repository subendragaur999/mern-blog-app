import React, { useContext, useEffect, useState } from "react";
import { BASE_URL, token } from "../utils/config";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const [blogData, setBlogData] = useState([]);

  const { role } = useContext(AuthContext);

  const getBlogData = async () => {
    const res = await fetch(`${BASE_URL}/blog/getblogs`);
    const { data } = await res.json();
    setBlogData(data);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${BASE_URL}/blog/delete/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    console.log(result);
    window.location.reload();
  };

  useEffect(() => {
    getBlogData();
  }, []);

  return (
    <>
      {blogData?.length < 1 ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="container">
            <div className="row row-cols-1 row-cols-lg-3 rows-cols-sm-1">
              {blogData.map((blog) => (
                <div class="card mt-2">
                  <img src={blog.image} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">{blog.title}</h5>
                    <p class="card-text">{blog.content}</p>
                    {role === "admin" ? (
                      <>
                        <Link
                          to={`/singleblog/${blog._id}`}
                          class="btn btn-primary"
                        >
                          Read Full Blog
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          class="btn btn-danger"
                        >
                          Delete Blog
                        </button>
                      </>
                    ) : (
                      <Link
                        to={`/singleblog/${blog._id}`}
                        class="btn btn-primary"
                      >
                        Read Full Blog
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
