import dbConnect from "@/config/dbConnect";
import { serialize } from "cookie";

export default async function handler(req, res){
    dbConnect()
try{
    res.setHeader(
        "Set-Cookie",
        serialize("AccessToken", "",{
            path : "/",
            httpOnly : true,
            secure : true
        })
    )
    res.status(200).json({
        success : true,
        message : "Logout Sucessfully"
    })
}
catch(error){
    console.error(error);
    res.status(500).json({
        message : "Internal Server Error"
    })
}
}