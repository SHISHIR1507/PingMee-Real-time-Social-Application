import { generateStreamToken } from "../lib/stream.js";
const getStreamToken=async(req,res)=>{
    try {
        const token=generateStreamToken(req.user.id)
        res.status(200).json({token})
    } catch (error) {
        console.error("Error fetching Stream token:", error)
        res.status(500).json({message:"Internal server error"})
    }
}


export {getStreamToken}