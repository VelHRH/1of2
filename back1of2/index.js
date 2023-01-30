import express from "express"
import mongoose from "mongoose";
import * as CategoryController from "./controllers/CategoryController.js"
import * as SubController from "./controllers/SubController.js"
import * as EventController from "./controllers/EventController.js"
import * as UserController from "./controllers/UserController.js"
import cors from "cors"
import { registerValidation } from './validations.js'
import checkAuth from './utils/checkAuth.js'

mongoose.connect(
  'mongodb+srv://admin:wwwwww@cluster0.soz1hvz.mongodb.net/1of2?retryWrites=true&w=majority')
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err))

const app = express();

app.use(express.json());
app.use(cors());

app.get('/categories', CategoryController.getAll);
app.get('/categories/:name', CategoryController.getOne);
app.get('/categories/:name/:id', SubController.getOne);
app.get('/categories/:name/:id/rating', EventController.getRating);
app.post('/categories/:name/:id/results', EventController.results);
app.get('/categories/:name/:id/:result', EventController.getResult);
app.post('/categories/:name/:id', checkAuth, SubController.giveStars);

app.post('/register', registerValidation, UserController.register);
app.post('/login', UserController.login);
app.get('/me', checkAuth, UserController.me);
app.post('/me', UserController.me);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});