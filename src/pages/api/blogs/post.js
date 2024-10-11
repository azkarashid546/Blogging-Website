import blogsSchema from "@/models/blogs";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  try {
    //  Slug Generate with Title
    var slug = req.body.title
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s]+/g, "-")
      .replace(/[-]+/g, "-");

      // Create BlogSchema 
      const blog = await blogsSchema.create({...req.body, slug })

      res.status(200).json({
        success : true,
        message : blog
      })

  } catch (error) {
    // Dublication Error in  Slug
    if(error.code === 11000){
        if(error.keyPattern.slug){
            return res.status(409).json({
                success : false,
                message : "Title Already Exists"
            })
        }
    }
    if(error.message?.split(":")[2]?.split(",")[0].trim()){
        var errMessage = error.message.split(":")[2].split(",")[0].trim()
        return res.status(400).json({
            success : false,
            message : errMessage
        })
    }
    res.status(500).json({
        success : false,
        message : "Internal Server Error"
    })
  }
}
