import ThemeModel from "../models/Theme.js"

export const getOne = async (req, res) => {
  try {
    const categoryName = req.params.name;
    const id = req.params.id
    ThemeModel.find(
      {name: id},
      (err, subcategory) => {
        if (err){
          console.log(err);
          return res.status(500).json({message: "Unable to get subcategory"});
        }
        if (subcategory.length === 0){
          return res.status(404).json({message: "Subcategory doesn't exist"});
        }
         res.json(subcategory);
      }
    )
  }
  catch (err) {
    console.log(err);
    res.status(500).json({message: "Unable to get category"});
  }
}

