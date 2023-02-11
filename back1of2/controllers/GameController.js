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
     current: [...events.slice(0,2), {round: 1, total: events.length}],
     history: [],
     user: user
   })
  await doc.save();
  res.json(doc)
  } catch (err) {
   console.log(err);
   return res.status(500).json({
    message: "Error with starting game",
   });
  }
 };

 export const setNext = async (req, res) => {
  try {
   const game = await req.params.game;
   const session = await ResultModel.findOne({ _id: game });
   if (session.results.length === session.current[2].total*2-2){
    session.results.push(req.body.choice);
    await ResultModel.findOneAndUpdate({ _id: game }, session)
    return res.json({success: true})
   }else{
   for (let i = session.results.length-1; i>=0; i--){
    if (session.results[i].name === session.current[0].name) {
      if (session.current[0].name === req.body.choice.name){
        session.results[i].likes++
        session.results[i+1].dislikes++
      }else{
        session.results[i].dislikes++
        session.results[i+1].likes++
      }
      session.current[0] = session.results[i+2];
      session.current[1] = session.results[i+3] || req.body.choice;
      session.current[2] = {round: session.current[2].round+1, total: session.current[2].total}
      break;
    }
  }
  session.results.push(req.body.choice);
  await ResultModel.findOneAndUpdate({ _id: game }, session)
  res.json(session)
}
  } catch (err) {
   console.log(err);
   return res.status(500).json({
    message: "Error with game session, sorry",
   });
  }
 };

 export const getCurrent = async (req, res) => {
  try {
   const game = await req.params.game;
   const session = await ResultModel.find({ _id: game });
   if (session.length===0 || session[0].current.length === 0) {
    return res
     .status(404)
     .json({ message: "No active game session with such id" });
   } 
  res.json(session[0])
  } catch (err) {
   console.log(err);
   return res.status(500).json({
    message: "Error with game session, sorry",
   });
  }
 };