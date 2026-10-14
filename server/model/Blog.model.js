import mongoose from "mongoose";

//  title, image, content, createdAt, likes and comments, user/author, topic/cat

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    requried: true,
  },
  image: {
    type: String,
    requried: true,
  },
  content: {
    type: String,
    requried: true,
  },
  topic: {
    type: String,
    requried: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requried: true,
    },
    name: {
      type: String,
      requried: true,
    },
  },
});

export default mongoose.model("Blog", BlogSchema);
