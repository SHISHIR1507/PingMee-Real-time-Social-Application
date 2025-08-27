import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js"
import { getMyFriends, getRecommendedUsers,sendFriendRequest,acceptFriendRequest,getFriendRequest,getOutGoingFriendRequest} from "../controllers/user.controllers.js"


const router = express.Router()


router.use(protectRoute)

router.get("/",getRecommendedUsers)
router.get("/friends",getMyFriends)
router.post("/friend-request/:id",sendFriendRequest)
router.put("/friend-request/:id",acceptFriendRequest)
router.get("/friend-request",getFriendRequest)
router.get("/outgoing-friend-requests",getOutGoingFriendRequest)



export default router