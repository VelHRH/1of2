import { body } from "express-validator";

export const registerValidation = [
  body('email', 'Invalid email').isEmail(),
  body('password', 'Password should be at least 8 symbols long').isLength({min: 8}),
  body('login', 'At least 3 caracters in name').isLength({min:3}),
  body('imgUrl', "Not an URL").optional().isURL()
];