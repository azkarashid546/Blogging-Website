import dbConnect from "@/config/dbConnect";
import CommentsSchema from "@/models/comments";

export default async function handler(req, res) {
  dbConnect();

  try {
    const getall = await CommentsSchema.find();
    res.status(200).json({
      success: true,
      message: getall,
    });
  } catch (error) {
    console.log(error);
  }
}