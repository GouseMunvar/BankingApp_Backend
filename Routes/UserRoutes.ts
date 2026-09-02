import express from "express"
import { RegisterUser,LoginUser } from "../Controllers/UserController"

const userRouter=express.Router()

userRouter.post("/register",RegisterUser)
userRouter.post("/login",LoginUser)


export default userRouter