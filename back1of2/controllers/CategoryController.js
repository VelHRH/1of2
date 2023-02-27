import CategoryModel from "../models/Category.js"
import ThemeModel from "../models/Theme.js"

export const getAll = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({message: "Unable to get categories"});
  }
}

export const getOne = async (req, res) => {
  try {
    const categoryName = req.params.name;
    ThemeModel.find(
      {category: categoryName},
      (err, subcategories) => {
        if (err){
          console.log(err);
          return res.status(500).json({message: "Unable to get category"});
        }
        res.json(subcategories);
      }
    )
  }
  catch (err) {
    console.log(err);
    res.status(500).json({message: "Unable to get category"});
  }
}

