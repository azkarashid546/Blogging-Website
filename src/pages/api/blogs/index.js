import dbConnect from "@/config/dbConnect";
import BlogSchema from "../../../models/blogs";

export default async function handler(req, res) {
  dbConnect();

  try {
    const getall = await BlogSchema.find();
    res.status(200).json({
      success: true,
      message: getall,
    });

  } catch (error) {
    console.log(error);
  }
}
