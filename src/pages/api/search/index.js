import blogSchema from "@/models/blogs";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
    const { category } = req.query;
    dbConnect()
    try{
       const search = await blogSchema.find({category}) 
       res.status(200).json({
        success : true,
        message : search,
       })
       console.log("search",search)
    }
    catch(error){
    res.status(500).json({
        success : false,
        messsage : "Internal Sever Error"
    })
    }
}