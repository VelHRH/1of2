import ThemeModel from "../models/Theme.js"
import CategoryModel from "../models/Category.js"
import UserModel from "../models/Users.js"

export const getOne = async (req, res) => {
  try {
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

export const sortByCat = async (req, res) => {
  try {
    const themes = await ThemeModel.find();
    const categories = await CategoryModel.find();
    let doc =[];
    for (let i of categories){
      let counter = 0;
      for (let j of themes){
        j.category === i.name && counter++
      }
      doc.push({category: i.name, themes: counter});
    }
    res.json(doc.sort((a, b) => b.themes-a.themes));
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


 export const add = async (req, res) => {
  try {
    const user = await req.userId;
    const userName = await UserModel.find({_id: user});
    const doc = new ThemeModel({
      name: req.body.name,
      imgUrl: req.body.imgUrl,
      stars: [],
      author: userName[0].login,
      description: req.body.description,
    });
    const theme = await doc.save();
    return res.json(theme);
  } catch (err) {
   console.log(err);
   res.status(500).json({ message: "Unable to add theme" });
  }
 };