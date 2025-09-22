import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { registerUser, loginUser, getCurrentUser, updateProfile, updatePassword } from '../controller/userController.js';


const userRouter= express.Router();

//public
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);


//private
userRouter.get('/me',authMiddleware,  getCurrentUser);
userRouter.put('/profile',authMiddleware,  updateProfile);
userRouter.put('/password', authMiddleware,   updatePassword);


export default userRouter;