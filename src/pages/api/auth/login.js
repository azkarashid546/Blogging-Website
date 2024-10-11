import dbConnect from "@/config/dbConnect";
import { GenAccessToken } from "@/helpers/jwt";
import User from "@/models/signup"
import bcrypt from "bcrypt"
import {serialize} from "cookie"

export default async function handler(req,res){
    dbConnect();
    try{
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).json({
                sucess : false,
                message : "Email and Password is required"
            });
            return;
        }
        const foundUser = await User.findOne({email})
        if(!foundUser){
            res.status(400).json({
                success : false,
                message : "Inavlid email and password"
            });
            return;
        }
        const IsPasswordValid = await bcrypt.compare(
            password,
            foundUser?.password
        )
        if(!IsPasswordValid){
            res.status(400).json({
                success : false,
                message : "Inavlid Password"
            });
            return;
        }

        const AccessToken = await GenAccessToken({
            id: foundUser._id,
          });
  
          res.setHeader(
            "Set-Cookie",
            serialize("AccessToken", AccessToken, {
              path: "/",
              httpOnly: true,
              secure: true,
            })
          );
          console.log(  res.setHeader(
            "Set-Cookie",
            serialize("AccessToken", AccessToken, {
              path: "/",
              httpOnly: true,
              secure: true,
            })
          ))

          
        const user = {
            id : foundUser._id,
            email : foundUser._email,
            userName : foundUser.userName,
        }
        res.status(201).json({
            user, 
            success : true
        })
    }
    catch(error){
    console.error(error);
    res.status(500).json({
        success : false,
        message : "Internal Server Error"
    })
    }
}