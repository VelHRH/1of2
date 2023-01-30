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

export const giveStars = async (req, res) => {
  try {
    const user = await req.userId;
    const theme = await ThemeModel.find(
      {name: req.params.id}
    );
    for (let i  in theme[0].stars){
      if (theme[0].stars[i].user === user){
        return  res.status(404).json({ message: "Already rated by you" });
      }
    }
    await ThemeModel.findOneAndUpdate(
      {name: req.params.id}, 
      {$push: {stars: {user: user, stars: req.body.stars}}}, 
    );
    return res.json({success: true});
  } catch (err) {
   console.log(err);
   res.status(500).json({ message: "Unable to rate the theme" });
  }
 };
