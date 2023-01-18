import mongoose from "mongoose"
const { Schema } = mongoose;

const postSchema = new Schema({
  title:  {
    type: String,
    required: [true, "The `title` is required"]
  },
  author: String,
  body:   {
    type: String,
    required: [true, "The `body` is required"]
  },
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  },
  user_id: {
    type: String,
    required: true
  }
});

const Post = mongoose.model("Post", postSchema)
export default Post