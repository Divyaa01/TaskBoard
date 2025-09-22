import jwt from 'jsonwebtoken';
import User from '../model/usermodel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export default async function authMiddleware(req, res, next) {
    ///bearer token
    const authHeader = req.headers.authorization;

    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res
        .status(401)
        .json({ success:false, message: 'Authorization token missing or not auth' });
    }

    const token = authHeader.split(' ')[1];
    
    //verify
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');    

        if(!user) {
            return res.status(401).json({ success:false, message: 'User not found' });
        }

        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ success:false, message: 'Invalid JWT or expired' ,error});
    }
}