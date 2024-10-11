import blogsSchema from "@/models/blogs";
import dbConnect from "@/config/dbConnect";
import Comments from "@/models/comments";

export default async function handler(req, res) {
  dbConnect();

  try {
    const singleblog = await blogsSchema.findOne({ slug: req.query.slug })
    if (!singleblog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found",
      });
    }

    const commentIds = singleblog.comments;

    // Fetch comments using the comment IDs
    const commentssingle = await Comments.find({ _id: { $in: commentIds } });
    console.log("azka",commentssingle)
  
    switch (req.method) {
      case "GET":
        return res.status(200).json({
          success: true,
          message: {singleblog, commentssingle},
        });
        break;
      case "PUT":
        const updateBlog = await blogsSchema.findByIdAndUpdate(singleblog._id, {
          $set: req.body,
        },{new:true});
        return res.status(200).json({
          success: true,
          message: updateBlog,
        });
        break;
      case "DELETE":
        await blogsSchema.findByIdAndDelete(singleblog._id);
        return res.status(200).json({
          success: true,
          message: "Blog Deleted Successfully",
        });
    }
  
  } catch (error) {
    console.log(error);
  }

 
}
