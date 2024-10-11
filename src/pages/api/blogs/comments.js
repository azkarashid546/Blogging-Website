import commentsSchema from "@/models/comments";
import blogsSchema from "@/models/blogs";
import blogSchema from "@/models/blogs"
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res, next) {
    dbConnect()
    try{
        console.log("Comments body data", req.body)
       const comments = await commentsSchema.create({...req.body, blogId : req.body.blogId}) 
       console.log("comments details",comments)

       const updateBlog = await blogsSchema.findByIdAndUpdate(req.body.blogId, {
        $push: {comments:comments},
        $inc:{totalComments:1},
      },{new:true});
      return res.status(200).json({
        success: true,
        message: updateBlog,
      });
    }
    catch(error){
    res.status(500).json({
        success : false,
        messsage : "Internal Server Error"
    })
    }
}