import EventModel from "../models/Event.js";
import UsersModel from "../models/Users.js";
import ResultModel from "../models/Result.js";

export const getRating = async (req, res) => {
 try {
  const id = req.params.id;
  const events = await EventModel.find(
    {subcategory: id}
  ).sort({ wins: -1 });
  for (let i in events){
    if (events[i].imgUrl.slice(0,4) !== "http") events[i].imgUrl = `${process.env.PORT || "http://localhost:4444"}/uploads/${events[i].imgUrl}`
  }
   res.json(events);
 } catch (err) {
  console.log(err);
  res.status(500).json({ message: "Unable to get category" });
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
    
    (user.winners.length==0 || Date().toString().slice(0,22) !== user.winners[0].date.toString().slice(0,22)) && user.winners.unshift({ ...sortedReq[i], date: new Date(), pageId: results._id });
     
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


export const addEvents = async (req, res) => {
  try {
    for (let i = 0; i<req.body.pictures.length; i++){
      const doc = new EventModel({
        name: req.body.names[i],
        imgUrl: req.body.pictures[i],
        likes: 0,
        dislikes: 0,
        wins: 0,
        subcategory: req.body.theme,
      });
      await doc.save();
    }
    return res.json({success: true});
  } catch (err) {
   console.log(err);
   res.status(500).json({ message: "Failed to add events" });
  }
 };