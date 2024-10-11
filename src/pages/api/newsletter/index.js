import newsletterSchema from "@/models/newsletter";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
    dbConnect()
    try{
       const newsletter = await newsletterSchema.create({...req.body}) 
       res.status(200).json({
        success : true,
        message : newsletter,
       })
    }
    catch(error){
    res.status(500).json({
        success : false,
        messsage : "Internal Sever Error"
    })
    }
}
