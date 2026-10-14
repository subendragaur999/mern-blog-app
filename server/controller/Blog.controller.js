import mongoose from "mongoose";
import Blog from "../model/Blog.model.js";

export const createBlog = async (req, res, next) => {
  const { title, image, content, topic } = req.body;

  const userId = req.userId;
  const userName = req.name;
  try {
    const data = new Blog({
      title,
      image,
      content,
      topic,
      author: {
        id: userId,
        name: userName
      }
    });

    await data.save();

    return res.status(200).json({ success: true, message: "Blog saved" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error, Can not create blog at this time",
    });
  }
};

export const editBlog = async (req, res, next) => {
  const blogId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

  // if(user.id !== blog.author.id) {
  // return error  
  // }

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $set: req.body },
      { new: true }
    );

    return res
      .status(200)
      .json({ success: true, message: " Blog updated...!" });
  } catch (error) {
    return res.status(500).json({ sucess: false, message: "Server error...!" });
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const allBlogs = await Blog.find();

    return res
      .status(200)
      .json({ success: true, message: "Blogs found", data: allBlogs });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error...!" });
  }
};

export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found with this ID" });
    }

    await Blog.findByIdAndDelete(blogId);

    return res.status(200).json({ success: true, message: "Blog deleted...!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSingleBlog = async (req, res, next) => {
  const blogId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found with this ID" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Blog found...!", data: blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getBlogByTopic = async (req, res, next) => {
  const reqTopic = req.params.topic;

  try {
    const blogs = await Blog.find({ topic: new RegExp(reqTopic, "i") });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No blogs foud with topic: ${reqTopic}`,
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Blogs found", data: blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getBlogsByTopicWithQuery = async (req, res, next) => {
  const reqTopic = req.query.topic;

  try {
    const blogs = await Blog.find({ topic: new RegExp(reqTopic, "i") });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Blogs noy found with topic ${reqTopic}`,
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Blogs found", data: blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getBlogsByMultipleTopicWithQuery = async (req, res, next) => {
  const { topic } = req.query;
  try {
    let query = {};

    query.topic = {
      $in: topic.map((curElm) => new RegExp(curElm, "i")),
    };

    const blogs = await Blog.find(query);

    if (!blogs || blogs.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Blogs found with this topic" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Blog found...!", data: blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
