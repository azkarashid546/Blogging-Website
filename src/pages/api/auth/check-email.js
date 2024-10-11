import dbConnect from '@/config/dbConnect';
import User from '@/models/users';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    dbConnect();
    const { email } = req.query;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    res.status(200).json({ exists: !!existingUser });
  } catch (error) {
    console.error('Error checking email existence:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}