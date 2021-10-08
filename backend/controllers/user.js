import express from "express";
const router = express.Router();
import {User} from "../models/user.js";
import { validationResult } from "express-validator";


export function create(req,res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
        })
    }
        
        const user = new User(req.body);
        console.log(user)
        user.save((err, user) =>{
            if(err){
                return res.status(400).json({
                    err: "NOT able to save user in DB",
                });
            }
            res.json({
                id: user._id,
                FullName : user.fullname,
                Email: user.email,
                PhoneNumber: user.phno,
                CountryCode: user.code,
            });
        });
    };

export function getUserById(req,res,next,id){
    User.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.profile=user;
        console.log(req.profile);
        next(); 
        return req.profile
    });
}

export function getUser(req,res){
    return res.json(req.profile);
}''
export function getAllUsers(req, res) {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    User.find()
      .exec((err, users) => {
        if (err) {
          return res.json(400).json({
            error: "No product found",
          });
        }
        return res.json(users);
      });
  }

export function updateUser(req,res){
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body}, //!req.body not req.profile
        {new: true, useFindAndModify: false}, //!useFindAndModify set to false must
        (err,user) => {
            if(err || !user){
                return res.status(400).json({
                    error: "You are not authorized to update this user"
                })
            }
            console.log(req.body);
            console.log(req.profile);
            console.log(user);
            res.json(user);
        }
    )
}

export function deleteUser(req, res, id) {
    let user = req.profile;
    user.remove((err, deletedUser) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete the user",
          e: err
        });
      }
      res.json({
        message: "User deleted",
        deletedUser,
      });
    });
  }

  export function deleteProduct(req, res) {
    let product = req.prod;
    product.remove((err, deletedProduct) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete the product",
        });
      }
      res.json({
        message: "Product deleted",
        deletedProduct,
      });
    });
  }
  
  export function updateProduct(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
        })
    }
        
        const user = new User(req.body);
        console.log(user)
        user.save((err, user) =>{
            if(err){
                return res.status(400).json({
                    err: "NOT able to save user in DB",
                });
            }
            res.json({
                id: user._id,
                FullName : user.fullname,
                Email: user.email,
                PhoneNumber: user.phno,
                CountryCode: user.code,
            });
        });
    };