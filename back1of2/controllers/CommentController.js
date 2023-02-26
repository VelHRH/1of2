import CommentModel from "../models/Comment.js"
import UserModel from "../models/Users.js"

export const add = async (req, res) => {
  try {
    const userID = await req.userId;
    const user = await UserModel.find({_id: userID});
    const comments = await CommentModel.find(
      {
        user: {name: user[0].login, id: user[0]._id},
        theme: req.params.id
      }
    )
    if (comments.length < 2){
      const doc = new CommentModel({
        user: {name: user[0].login, id:user[0]._id},
        text: req.body.text,
        theme: req.params.id
      });
      const comment = await doc.save();
      return res.json(comment);
    }
    else{
      return res.status(403).json({message: "You can post up to 2 comments under a theme"});
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

export const edit = async (req, res) => {
  try {
    const comment = await CommentModel.findOneAndUpdate(
      {_id: req.body.id},
      {text: req.body.text},
      { returnOriginal: false },
    );
    res.json(comment)
  }
  catch (err) {
    console.log(err);
    res.status(500).json({message: "Unable to get comments"});
  }
}

export const deleteComm = async (req, res) => {
  try {
    await CommentModel.findOneAndDelete(
      {_id: req.body.id},
    );
    res.json({success: true})
  }
  catch (err) {
    console.log(err);
    res.status(500).json({message: "Unable to get comments"});
  }
}

export const likeComment = async (req, res) => {
  try {
    const userID = await req.userId;
    const comment = await CommentModel.find(
      {_id: req.body.id}
    );
    for (let i  in comment[0].likes){
      if (comment[0].likes[i] === userID){
        return  res.status(404).json({ message: "Already upvoted" });
      }
    }
    comment[0].likes.push(userID);
    comment[0].dislikes.splice(comment[0].dislikes.indexOf(userID), 1)
    await CommentModel.findOneAndUpdate(
      {_id: req.body.id}, 
      comment[0]
    );
    return res.json(comment[0]);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({message: "Unable to get comments"});
  }
}

export const dislikeComment = async (req, res) => {
  try {
    const userID = await req.userId;
    const comment = await CommentModel.find(
      {_id: req.body.id}
    );
    for (let i  in comment[0].dislikes){
      if (comment[0].dislikes[i] === userID){
        return  res.status(404).json({ message: "Already downvoted" });
      }
    }
    comment[0].dislikes.push(userID);
    comment[0].likes.splice(comment[0].likes.indexOf(userID), 1)
    await CommentModel.findOneAndUpdate(
      {_id: req.body.id}, 
      comment[0]
    );
    return res.json(comment[0]);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({message: "Unable to get comments"});
  }
}