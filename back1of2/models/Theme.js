import mongoose from "mongoose";

const ThemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String
  },
  imgUrl: {
    type: String,
    required: true,
  },
  stars: {
    type: Array,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
},
{
  timestamps: true
}
);

export default mongoose.model('Theme', ThemeSchema);