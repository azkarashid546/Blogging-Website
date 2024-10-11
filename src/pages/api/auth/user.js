
import dbConnect from '@/config/dbConnect';
import User from '@/models/users';
import { VerifyToken } from '@/helpers/jwt';

export default async function handler(req, res) {
  dbConnect();

  try{
    const token = req.headers.cookie;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // Verify the token to get the user information
    const user = VerifyToken(token);
  
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }


    switch(req.method){
    case 'GET' :
      return res.status(200).json({
        success: true,
        message: user,
      });
      break;
  
      
    }
  }
  catch(error){
    console.log(error);
  }
}