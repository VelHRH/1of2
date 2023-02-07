import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  theme: {
    type: String,
    required: true,
  }
},
{
  timestamps: true
}
);

export default mongoose.model('Comment', CommentSchema);