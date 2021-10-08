import Router from "express";
const userRoutes = Router();

import {getUser,getUserById,updateUser, create, getAllUsers, deleteUser} from "../controllers/user.js";

import { check, validationResult } from "express-validator";

userRoutes.post(
  "/create",
  [
    check("fullname", "name should be atleast 3 charr").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
  ],
  create
);
userRoutes.get("/userslist",getAllUsers);
userRoutes.param("userId",getUserById);
userRoutes.get("/user/:userId",getUser);
userRoutes.put("/user/:userId",updateUser);
userRoutes.delete("/user/:userId",deleteUser);

export {userRoutes};