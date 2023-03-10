import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true,
  },
  imgUrl: String,
  login: {
    type: String,
    required: true,
    unique: true
  },
  created:{
    type: Array,
    default: []
  },
  favourite:{
    type: Array,
    default: []
  },
  rank: {
    type: String,
    default: "common"
  },
  winners: {
    type: Array,
    required: true,
  }
},
{
  timestamps: true
}
);

export default mongoose.model('Users', UsersSchema);