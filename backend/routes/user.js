import Router from "express";
const userRoutes = Router();

import {getUser,getUserById,updateUser, signup} from "../controllers/user.js";

import { check, validationResult } from "express-validator";

userRoutes.post(
  "/signup",
  [
    check("fullname", "name should be atleast 3 charr").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
  ],
  signup
);
userRoutes.param("userId",getUserById);
userRoutes.get("/user/:userId",getUser);
userRoutes.put("/user/:userId",updateUser);

export {userRoutes};