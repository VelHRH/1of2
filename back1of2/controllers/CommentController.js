import CommentModel from "../models/Comment.js"

export const add = async (req, res) => {
  try {
    const user = await req.userId;
    const comments = await CommentModel.find(
      {
        user: user,
        theme: req.params.id
      }
    )
    if (comments.length < 2){
      const doc = new CommentModel({
        user: user,
        text: req.body.text,
        theme: req.params.id
      });
      const comment = await doc.save();
      res.json(comment);
    }
    else{
      res.status(403).json({message: "You can post up to 2 comments under a theme"});
    }
   
  }
  catch (err) {
    console.log(err);
    res.status(500).json({message: "Unable to post comment"});
  }
}

export const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.find(
      {
        theme: req.params.theme
      }
    ).sort({likes: -1});
    res.json(comments);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({message: "Unable to get comments"});
  }
}