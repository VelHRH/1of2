import UserModel from '../models/Users.js'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json(errors.array());
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const doc = new UserModel({
      email: req.body.email,
      login: req.body.login,
      imgUrl: req.body.imgUrl,
      passwordHash
    })

    const user = await doc.save();

    const token = jwt.sign(
      {_id: user._id},
      'secret123',
      {expiresIn: '30d'}
    );

    res.json({...user._doc, token})
  }
  catch (err){
    console.log(err);
    res.status(500).json({ message: "Unable to register" });
  }
}

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({email: req.body.email});
    if (!user) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);
    if (!isValidPassword){
      return res.status(400).json({ message: "Wrong email or password" });
    }

    const token = jwt.sign(
      {_id: user._id},
      'secret123',
      {expiresIn: '30d'}
    );

    res.json({...user._doc, token})
  }
  catch (err){
    console.log(err);
    res.status(500).json({ message: "Unable to login" });
  }
}


export const me = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId || req.body._id);
    if (!user) {
      return res.status(403).json({ message: "No user found" });
    }
    res.json(user)
  }
  catch (err){
    console.log(err);
    res.status(500).json({ message: "Unable to see the information" });
  }
}