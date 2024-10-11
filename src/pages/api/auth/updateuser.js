import dbConnect from '@/config/dbConnect';
import User from '@/models/users';
import { VerifyToken } from '@/helpers/jwt';

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    try {
      // Ensure the request has a valid token
      const authorization = req.headers.cookie;

      if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    
      // Verify the token to get the user information
      const user = VerifyToken(authorization);
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid token' });
      }
  
      // Get the updated profile data from the request body
      const updatedProfile = req.body;
  
      // Update the user profile (implement your logic here)
      user.name = updatedProfile.name;
      user.email = updatedProfile.email;
      user.userName = updatedProfile.userName

      if (newPassword) {
        user.password = newPassword;
      }
      // Send the updated user data as the response
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }