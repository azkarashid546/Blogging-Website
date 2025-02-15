import dbConnect from "@/config/dbConnect";
import User from "@/models/signup";
import bcrypt from "bcrypt";
 
export default async function handler(req, res){
    dbConnect();
    try{
        if(!req.body.userName){
            res.status(400).json({
                success : false,
                message : "Username is required"
            });
            return;
        }
        if(!req.body.email){
            res.status(400).json({
                success : false,
                message : "Email is required"
            });
            return;
        }
        if(!req.body.password){
            res.status(400).json({
                success : false,
                message : "Password is required"
            });
            return;
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = await User.create({
            ...req.body,
            password : hashedPassword

        })
        res.status(201).json({
            success : true,
            message : user
        })
    }
    catch(error){
    if(error?.code === 11000){
        res.status(409).json({
            success : false,
            message : "Email and Username already in use"
        })
    }
    else if(error.keyPattern.userName){
        res.status(409).json({
            success : false,
            message : "Username already in use"
        })
    }
    return;
    }
}
