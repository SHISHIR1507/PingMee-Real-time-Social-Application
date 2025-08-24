import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js"
import { getMyFriends, getRecommendedUsers,sendFriendRequest,acceptFriendRequest,getFriendRequest} from "../controllers/user.controllers.js"

const router = express.Router()


router.use(protectRoute)

router.get("/",getRecommendedUsers)
router.get("/",getMyFriends)
router.post("/friend-request/:id",sendFriendRequest)
router.put("/friend-request/:id",acceptFriendRequest)
router.get("/friend-request",getFriendRequest)



export default router