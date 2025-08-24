import User from "../models/User.model.js";

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

}

export {getRecommendedUsers,getMyFriends,sendFriendRequest}