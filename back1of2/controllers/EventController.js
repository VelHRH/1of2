import EventModel from "../models/Event.js";
import UsersModel from "../models/Users.js";

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
     .json({ message: "No event's yet for such subcategory" });
   }
   res.json(events);
  }).sort({ wins: -1 });
 } catch (err) {
  console.log(err);
  res.status(500).json({ message: "Unable to get category" });
 }
};

export const results = async (req, res) => {
 try {
  let sortedReq = [];
  for (let i = req.body.res.length - 1; i >= 0; i--) {
   let isIn = 0;
   for (let j = 0; j < sortedReq.length; j++) {
    if (req.body.res[i].name === sortedReq[j].name) {
     isIn++;
     break;
    }
   }
   if (isIn == 0) {
    sortedReq.push(req.body.res[i]);
   }
  }
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
    const user = await UsersModel.findById(req.userId);
    user.winners.unshift({ ...sortedReq[i], date: new Date() });
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
        message: "Error with results",
       });
      }
     }
    );
   }
  }
  res.json(req.body);
 } catch (err) {
  console.log(err);
  return res.status(500).json({
   message: "Error with results",
  });
 }
};
