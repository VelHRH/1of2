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
    .map((event) => ({ ...event._doc, curLikes: 0, curDislikes: 0 }));
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
   session.history.push(session.current[0], session.current[1]);
   if (session.results.length === session.current[2].total*2-2){
    req.body.choice.curLikes++;
    if (session.results[session.results.length-1].name !== req.body.choice.name) 
      {session.results[session.results.length-1].curDislikes++}
    else {session.results[session.results.length-2].curDislikes++}
    session.results.push(req.body.choice);
    await ResultModel.findOneAndUpdate({ _id: game }, session)
    return res.json({success: true})
   }else{
   for (let i = session.results.length-1; i>=0; i--){
    if (session.results[i].name === session.current[0].name) {
      if (session.current[0].name === req.body.choice.name){
        session.results[i+1].curDislikes++
      }else{
        session.results[i].curDislikes++
      }
      req.body.choice.curLikes++;
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

 export const openResult = async (req, res) => {
  try {
   const session = req.params.game;
   const result = await ResultModel.findOne({ _id: session });
   if (!result) {
    return res
     .status(404)
     .json({ message: "No game held with such id!" });
   } 
   const top = [];
   for (let i=result.results.length-1; i>=0; i--){
    if (top.find(t => t.name === result.results[i].name) === undefined){
      top.push(result.results[i]);
    }
   }
   res.json({top, history: result.history});
  } catch (err) {
   console.log(err);
   res.status(500).json({ message: "Unable to post the results" });
  }
 };

 export const handleResult = async (req, res) => {
  try {
   const session = req.params.game;
   const result = await ResultModel.findOne({ _id: session });
   if (!result) {
    return res
     .status(404)
     .json({ message: "No game held with such id!" });
   } 
   const top = [];
   for (let i=result.results.length-1; i>=0; i--){
    if (top.indexOf(result.results[i]) === -1){
      top.push(result.results[i]);
      const wins = result.results[i].currDislikes === 0 ? 1 : 0
      EventModel.findOneAndUpdate(
        {_id: result.results[i]._id}, 
        {
          likes: result.results[i].likes + result.results[i].curLikes,
          dislikes: result.results[i].dislikes + result.results[i].curDislikes,
          wins:  result.results[i].wins + wins
        }
      ).then((err, doc) => {
        if (err || !doc) {
          console.log(err);
          res.status(500).json({ message: "Unable to post the results" });
        }
      })
    }
   }
   console.log(top);
   res.json(top);
  } catch (err) {
   console.log(err);
   res.status(500).json({ message: "Unable to post the results" });
  }
 };