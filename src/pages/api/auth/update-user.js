
import dbConnect from '@/config/dbConnect';

import { VerifyToken } from '@/helpers/jwt';

export default async function handler(req, res) {
  try {
  dbConnect();

  const { userId } = req.query;
  if (req.method !== 'PUT') {
    return res.status(405).json({message : "Method Not Allowed"}); // Method Not Allowed
  }

  // const authorization = req.headers.cookie;
  // console.log(authorization)

  // if (!authorization) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }

  // const token = authorization.replace('authorization=', '');
  const userData = await VerifyToken(token);
  if (!userData || userData !== userId) {
    return res.status(401).json({ success: false, message: 'Invalid token or user ID' });
  }

  console.log("azka",userData)

  if (!userData) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }



   const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}