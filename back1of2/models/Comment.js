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
    type: Array,
    default: [],
  },
  dislikes: {
    type: Array,
    default: [],
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