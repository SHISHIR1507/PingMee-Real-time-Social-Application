import User from "../models/User.model.js";
import FriendRequest from "../models/FriendRequest.model.js";

const getRecommendedUsers=async(req,res)=>{

    try {
        const currentUserId=req.user.id
        const currentUser=req.user

        const recommendedUsers=await User.find(
            {
                $and:[
                    {_id:{$ne:currentUserId}},
                    {$id:{$nin:currentUser.friends}},
                    {isOnboarded:true},
                ],
            }
        )
        res.status(200).json({
           recommendedUsers
        })

    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getMyFriends=async(req,res)=>{
    try {
        const user=await User.findById(req.user.id).populate("friends","fullName profilePic nativeLanguage learningLanguage location")
        res.status(200).json(user.friends)
    } catch (error) {
        console.error("Error fetching friends:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

const sendFriendRequest=async(req,res)=>{
    try {
        const myId=req.user.id
        const {id:recipientId}=req.params

        if(myId===recipientId){
            return res.status(400).json({message:"You cannot send friend request to yourself"})
        }
        const recipient=await User.findById(recipientId)
        if(!recipient){
            return res.status(404).json({message:"User not found"})
        }
        if(recipient.friends.includes(myId)){
            return res.status(400).json({message:"You are already friends"})
        }
        const existingRequest=await FriendRequest.findOne({
            $or:[
                {sender:myId,recipient:recipientId},
                {sender:recipientId,recipient:myId}
            ]
        })
        if(existingRequest){
            return res.status(400).json({message:"Friend request already exists"})
        }
        const friendRequest=new FriendRequest.create({
            sender:myId,
            recipient:recipientId
        })
        res.status(200).json(friendRequest)
        
    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export {getRecommendedUsers,getMyFriends,sendFriendRequest}