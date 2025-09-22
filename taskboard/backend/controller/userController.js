import User from "../model/usermodel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";
const TOKEN_EXPIRES = '24h';

const createToken = (Userid) => {
    return jwt.sign({Userid}, JWT_SECRET, {expiresIn: TOKEN_EXPIRES});
}

//register
export async function registerUser(req, res) {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({success:false, message: "Please enter all fields" });
    }
    if(!validator.isEmail(email)) {
        return res.status(400).json({success:false, message: "Please enter a valid email" });
    }
    if(!validator.isStrongPassword(password)) {
        return res.status(400).json({success:false, message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol" });
    }

    try {
        if(await User.findOne({email})) {
        
            return res.status(409).json({success:false, message: "User already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashed});
        const token = createToken(user._id);
        res.status(201).json({success:true, user:{id:user._id, name:user.name, password:user.password, email:user.email},message: "User registered successfully", token});
    }
    catch (error) {
        res.status(500).json({success:false, message: "Internal server error" });
    }
    
}

//login
export async function loginUser(req,res) {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({success:false, message: "Please enter all fields" });
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({success:false, message: "Invalid credentials" });
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match){
            return res.status(401).json({success:false, message: "Enter correct password" });
        }

        const token = createToken(user._id);
        res.status(200).json({success:true, user:{id:user._id, name:user.name, email:user.email}, message: "User logged in successfully", token});  
    }
    catch(error){
        res.status(500).json({success:false, message: "Internal server error" });
    }
   
    
}

//get current user

export async function getCurrentUser(req,res) {
    try{
const user = await User.findById(req.user.id).select("name email");

if(!user){
    return res.status(404).json({success:false, message: "User not found" });
}
res.status(200).json({success:true, user});
    }
    catch(error){
        res.status(500).json({success:false, message: "Internal server error" });
    }
}

//update user
export async function updateProfile(req,res){
    const {name, email} = req.body;

    if(!name || !email || !validator.isEmail(email)){
        return res.status(400).json({success:false, message: "Validate name and email" });
    }

    try{
        const exists= await User.findOne({email, _id: {$ne: req.user.id}});

        if(exists){
            return res.status(409).json({success:false, message: "Email already in use" });
        }
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {name, email},
            {new:true, runValidators:true , select: "name email"}
        )
    }
    catch(error){
        res.status(500).json({success:false, message: "Internal server error" });
    }
}

//change password
export async function updatePassword(req,res){
    const {currentPassword, newPassword} = req.body;

    if(!currentPassword || !newPassword ||newPassword.isStrongPassword() ){
        return res.status(400).json({success:false, message: "Please enter all fields" });
    }

    try{
        const user = await User.findById(req.user.id).select("password");

        if(!user){
            return res.status(404).json({success:false, message: "User not found" });
        }

        const match = await bcrypt.compare(currentPassword, user.password);

        if(!match){
            return res.status(401).json({success:false, message: "Incorrect current password" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        
        await user.save();
        res.status(200).json({success:true, message: "Password updated successfully" });
    }
    catch(error){
        res.status(500).json({success:false, message: "Internal server error" });
    }
}