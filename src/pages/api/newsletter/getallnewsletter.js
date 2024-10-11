import dbConnect from "@/config/dbConnect";
import newsletterSchema from "@/models/newsletter";

export default async function handler(req, res) {
  dbConnect();

  try {
    const getall = await newsletterSchema.find();
    res.status(200).json({
      success: true,
      message: getall,
    });
  } catch (error) {
    console.log(error);
  }
}