import ResultModel from "../models/Result.js";
import EventModel from "../models/Event.js";
import UsersModel from "../models/Users.js";

function shuffle(array) {
  let currentIndex = array.length,
   randomIndex;

  while (currentIndex != 0) {
   randomIndex = Math.floor(Math.random() * currentIndex);
   currentIndex--;

   [array[currentIndex], array[randomIndex]] = [
    array[randomIndex],
    array[currentIndex],
   ];
  }
  return array;
 }


export const results = async (req, res) => {
  try {
   const user = await UsersModel.findById(req.body.user);
   const id = await req.params.id;
   let events = await EventModel.find({ subcategory: id });
   if (events.length === 0) {
    return res
     .status(404)
     .json({ message: "No events yet for such subcategory" });
   } else {
    events = await shuffle(events).slice(0, parseInt(req.body.clickedMode))
    .map((event) => ({ ...event, curLikes: 0 }))
   }

   const doc = new ResultModel({
     results: events,
     history: [],
     user: user
   })
  await doc.save();
  res.json(doc)
  } catch (err) {
   console.log(err);
   return res.status(500).json({
    message: "Error with results (other)",
   });
  }
 };