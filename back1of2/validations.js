import { body } from "express-validator";

export const registerValidation = [
  body('email').isEmail(),
  body('password').isLength({min: 8}),
  body('login').isLength({min:3}),
  body('imgUrl').optional().isURL()
];