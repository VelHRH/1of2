import CategoryModel from "../models/Category.js"

export const getOne = async (req, res) => {
  try {
    const categoryName = req.params.name;
    const id = req.params.id
    CategoryModel.findOne(
      {name: categoryName},
      {"subcategories": {$elemMatch: {"name": id}}},
      (err, subcategory) => {
        if (err){
          console.log(err);
          return res.status(500).json({message: "Unable to get subcategory"});
        }
        if (subcategory.subcategories.length === 0){
          return res.status(404).json({message: "Subcategory doesn't exist"});
        }
         res.json(subcategory.subcategories[0]);
      }
    )
  }
  catch (err) {
    console.log(err);
    res.status(500).json({message: "Unable to get category"});
  }
}

