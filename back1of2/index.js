import express from "express"
import mongoose from "mongoose";
import multer from "multer";
import * as CategoryController from "./controllers/CategoryController.js"
import * as SubController from "./controllers/SubController.js"
import * as EventController from "./controllers/EventController.js"
import * as UserController from "./controllers/UserController.js"
import * as CommentController from "./controllers/CommentController.js"
import * as GameController from "./controllers/GameController.js"
import cors from "cors"
import { registerValidation } from './validations.js'
import checkAuth from './utils/checkAuth.js'

mongoose.connect(
  'mongodb+srv://admin:wwwwww@cluster0.soz1hvz.mongodb.net/1of2?retryWrites=true&w=majority')
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err))

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({storage});

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.get('/categories', CategoryController.getAll);
app.get('/categories/:name', CategoryController.getOne);
app.get('/categories/:name/:id', SubController.getOne);
app.get('/categories/:name/:id/rating', EventController.getRating);
app.post('/categories/:name/:id', checkAuth, SubController.giveStars);
app.get('/sortedcategories', SubController.sortByCat);

app.post('/categories/:name/:id/results', GameController.results);
app.get('/categories/:name/:id/:game/currentGame', GameController.getCurrent);
app.post('/categories/:name/:id/:game/next', GameController.setNext);
app.get('/categories/:name/:id/:game/oneresult', GameController.openResult);
app.put('/categories/:name/:id/:game/updateResult', GameController.handleResult);

app.post('/categories/:name/:id/comment', checkAuth,  CommentController.add);
app.get('/categories/:name/:theme/allcomments', CommentController.getComments);
app.put('/categories/:name/:theme/edit', checkAuth, CommentController.edit);
app.delete('/categories/:name/:theme/delete', checkAuth, CommentController.deleteComm);
app.post('/categories/:name/:theme/likecomment', checkAuth, CommentController.likeComment);
app.post('/categories/:name/:theme/dislikecomment', checkAuth, CommentController.dislikeComment);

app.post('/theme/add', checkAuth, SubController.add);

app.post('/register', registerValidation, UserController.register);
app.get('/users/all', UserController.getAll)
app.post('/login', UserController.login);
app.get('/me', checkAuth, UserController.me);
app.post('/me', UserController.me);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `uploads/${req.file.originalname}`,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});