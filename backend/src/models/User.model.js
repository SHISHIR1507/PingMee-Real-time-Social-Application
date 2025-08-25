import mongoose from "mongoose";   
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({ 
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
    },
    bio:{
        type: String,
        default: "Hey there! I am using PingMee",
    },
    profilePic:{
        type: String,
        default: "",
    },
    nativeLanguage: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "",
    },
    isOnboarded: {
        type: Boolean,
        default: false,
    },
    friends:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'}]
},{timestamps: true});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
        
    } catch (error) {
        next(error);
    }
})
userSchema.methods.isPasswordCorrect= async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


const User = mongoose.model("User", userSchema);




export default User;