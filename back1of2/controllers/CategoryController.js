import CategoryModel from "../models/Category.js"

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
    CategoryModel.findOne(
      {name: categoryName},
      "subcategories",
      (err, subcategories) => {
        if (err){
          console.log(err);
          return res.status(500).json({message: "Unable to get category"});
        }
        if (!subcategories){
          return res.status(404).json({message: "Category doesn't exist"});
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