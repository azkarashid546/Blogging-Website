import dbConnect from "@/config/dbConnect";
import ContactusSchema from "@/models/contactus";

export default async function handler(req, res) {
  dbConnect();

  try {
    const getall = await ContactusSchema.find();
    res.status(200).json({
      success: true,
      message: getall,
    });
  } catch (error) {
    console.log(error);
  }
}