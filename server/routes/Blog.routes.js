import express from "express";
import {
  createBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getBlogByTopic,
  getBlogsByMultipleTopicWithQuery,
  getBlogsByTopicWithQuery,
  getSingleBlog,
} from "../controller/Blog.controller.js";
import { authorize, restrict } from "../auth/VerifyToken.auth.js";

const route = express.Router();

// http://localhost:8080/api/v1/blog/createblog
route.post("/createblog", authorize, createBlog);
// http://localhost:8080/api/v1/blog/editblog/1321313
route.put("/editblog/:id", authorize, editBlog);
// http://localhost:8080/api/v1/blog/getblogs
route.get("/getblogs", getAllBlogs);
// http://localhost:8080/api/v1/blog/delete/1223
route.delete("/delete/:id", authorize, restrict(["admin"]), deleteBlog);
// http://localhost:8080/api/v1/blog/getsingleblog/12323
route.get("/getsingleblog/:id", getSingleBlog);
// http://localhost:8080/api/v1/blog/getblogsbytopic/js
route.get("/getblogsbytopic/:topic", getBlogByTopic);
// http://localhost:8080/api/v1/blog/getblogsquery/?topic=js
route.get("/getblogsquery", getBlogsByTopicWithQuery);
// http://localhost:8080/api/v1/blog/getmultiplequery/?topic=js&topic=html
route.get("/getmultiplequery", getBlogsByMultipleTopicWithQuery);

export default route;
