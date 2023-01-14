import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subcategories: {
    type: Array,
    required: true,
  }
},
{
  timestamps: true
}
);

export default mongoose.model('Category', CategorySchema);