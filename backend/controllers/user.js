import express from "express";
const router = express.Router();
import {User} from "../models/user.js";
import { validationResult } from "express-validator";


export function signup(req,res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
        })
    }
        
        const user = new User(req.body);
        user.save((err, user) =>{
            if(err){
                return res.status(400).json({
                    err: "NOT able to save user in DB",
                });
            }
            res.json({
                name: user.name,
                email: user.email,
                id: user._id,
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
    });
}

export function getUser(req,res){
    return res.json(req.profile);
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
            // console.log(req.body);
            // console.log(req.profile);
            // console.log(user);
            res.json(user);
        }
    )
}