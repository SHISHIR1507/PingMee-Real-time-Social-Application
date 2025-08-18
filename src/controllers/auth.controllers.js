import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "../lib/stream.js";


const signup=async (req, res) => {
    const {fullName, email, password}=req.body

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 10) {
            return res.status(400).json({ message: "Password must be at least 10 characters long" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({email});
            if (existingUser) {
                return res.status(400).json({ message: "email already exists ..try another email id" });
                
            }

            const idx=Math.floor(Math.random() * 100)+1;
            const randomAvatar=`https://avatar.iran.liara.run/public/${idx}.png`

            const newUser=await User.create({
                fullName,
                email,
                password,
                profilePic: randomAvatar
            })


            // Upsert user in Stream

            try {
                await upsertStreamUser({
                    id: newUser._id.toString(),
                    name: newUser.fullName,
                    image: newUser.profilePic || "",
                })
                console.log(`Stream user created for : ${newUser.fullName}`);
                
            } catch (error) {
                console.error("Error upserting Stream user:", error);
            }
    
            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, 
                { expiresIn: process.env.JWT_EXPIRATION });

            res.cookie("jwt", token, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true, //prevents xss attacks
                sameSite: "strict", //prevents csrf attacks
                secure: process.env.NODE_ENV === "production", //ensures cookie is sent over HTTPS in production
            }),
            res.status(201).json({
                success: true,
                message: "User created successfully",
                user: newUser})

         
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" }); 
        
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(401).json({ message: "All fields are required" });
        }
        const emaill=await User.findOne({ email });
        if (!emaill) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isPasswordMatch = await emaill.isPasswordCorrect(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ userId: emaill._id }, process.env.JWT_SECRET, 
                { expiresIn: process.env.JWT_EXPIRATION });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, //prevents xss attacks
            sameSite: "strict", //prevents csrf attacks
            secure: process.env.NODE_ENV === "production", //ensures cookie is sent over HTTPS in production
        })
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: emaill
        })

    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ message: "Internal server error" });
        
    }
};

const logout = async (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
};

export { signup, login, logout };