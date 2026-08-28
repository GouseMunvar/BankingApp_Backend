import express from "express"
import { RegisterUser,LoginUser } from "../Controllers/UserController"

const userRouter=express.Router()

userRouter.post("/registerUser",RegisterUser)
userRouter.post("/loginUser",LoginUser)


export default userRouter