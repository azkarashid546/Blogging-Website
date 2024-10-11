
import dbConnect from '@/config/dbConnect';
import User from '@/models/users';
import { VerifyToken } from '@/helpers/jwt';

export default async function handler(req, res) {
  dbConnect();

  const { _id} = req.query;
  console.log("dfhjfgg",req.query._id)
  if (req.method === 'GET') {
    try {
   

      // Fetch user data by userId
      const user = await User.findById(_id);
       console.log(user)
      // If the user is not found, return an error
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}