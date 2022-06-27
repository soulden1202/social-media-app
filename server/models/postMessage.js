import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  creator: String,
  title: String,
  message: String,
  name: String,
  tags: [String],
  selectedFile: String,
  avatar: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: [
    {
      avatar: String,
      name: String,
      comment: String,
    },
  ],
  createAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
