import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  curLikes: {
    type: Number,
  },
  dislikes: {
    type: Number,
    required: true,
  },
  curDislikes: {
    type: Number,
  },
  wins: {
    type: Number,
    required: true,
  }
},
{
  timestamps: true
}
);

export default mongoose.model('Event', EventSchema);