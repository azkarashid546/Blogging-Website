import contactusSchema from "@/models/contactus";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
    dbConnect()
    try{
       const contactus = await contactusSchema.create({...req.body}) 
       res.status(200).json({
        success : true,
        message : contactus,
       })
       console.log("Contact Us", contactus)
    }
    catch(error){
    res.status(500).json({
        success : false,
        messsage : "Internal Sever Error"
    })
    }
}
