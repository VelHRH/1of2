import EventModel from "../models/Event.js";
import UsersModel from "../models/Users.js";
import ResultModel from "../models/Result.js";

export const getRating = async (req, res) => {
 try {
  const id = req.params.id;
  EventModel.find({ subcategory: id }, (err, events) => {
   if (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to get events" });
   }
   if (events.length === 0) {
    return res
     .status(404)
     .json({ message: "No events yet for such subcategory" });
   }
   res.json(events);
  }).sort({ wins: -1 });
 } catch (err) {
  console.log(err);
  res.status(500).json({ message: "Unable to get category" });
 }
};

export const getResult = async (req, res) => {
  try {
   const result = req.params.result;
   ResultModel.find({ _id: result }, (err, result) => {
    if (err) {
     console.log(err);
     return res.status(500).json({ message: "Unable to get the results" });
    }
    if (!result) {
     return res
      .status(404)
      .json({ message: "No results for such url" });
    }
    res.json(result);
   });
  } catch (err) {
   console.log(err);
   res.status(500).json({ message: "Unable to get the results" });
  }
 };

export const results = async (req, res) => {
 try {
  const user = await UsersModel.findById(req.body.user);
  let sortedReq = [];
  for (let i = req.body.results.length - 1; i >= 0; i--) {
   let isIn = 0;
   for (let j = 0; j < sortedReq.length; j++) {
    if (req.body.results[i].name === sortedReq[j].name) {
     isIn++;
     break;
    }
   }
   if (isIn == 0) {
    sortedReq.push(req.body.results[i]);
   }
  }
  const doc = new ResultModel({
    results: sortedReq,
    history: req.body.results,
    user: user
  })

  const results = await doc.save();
  if (user){
  for (let i = 0; i < sortedReq.length; i++) {
   if (i === 0) {
    EventModel.updateOne(
     { _id: sortedReq[i]._id },
     {
      likes: sortedReq[i].likes + sortedReq[i].curLikes,
      wins: sortedReq[i].wins + 1,
     },
     (err) => {
      if (err) {
       console.log(err);
       return res.status(500).json({
        message: "Error with results",
       });
      }
     }
    );
    
    (user.winners.length==0 || Date().toString().slice(0,22) !== user.winners[0].date.toString().slice(0,22)) && user.winners.unshift({ ...sortedReq[i], date: new Date() });
     
    await user.save();
   } else {
    EventModel.updateOne(
     { _id: sortedReq[i]._id },
     {
      likes: sortedReq[i].likes + sortedReq[i].curLikes,
      dislikes: sortedReq[i].dislikes + 1,
     },
     (err) => {
      if (err) {
       console.log(err);
       return res.status(500).json({
        message: "Error with results (user)",
       });
      }
     }
    );
   }
  }
}
  res.json(results);
 } catch (err) {
  console.log(err);
  return res.status(500).json({
   message: "Error with results (other)",
  });
 }
};
