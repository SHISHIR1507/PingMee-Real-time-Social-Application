import express from "express"
import dotenv from "dotenv"
import connectDB from "./lib/database.js"
import cookieParser from "cookie-parser"

//
dotenv.config()
const app = express()
const PORT = process.env.PORT || 6969;
app.use(express.json())
app.use(cookieParser())

// Importing routes
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"

// Using routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/chat", chatRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  connectDB()
})