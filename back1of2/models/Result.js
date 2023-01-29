import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  results: {
    type: Array,
    required: true,
  },
  user:{
    type: String
  }
},
{
  timestamps: true
}
);

export default mongoose.model('Result', ResultSchema);