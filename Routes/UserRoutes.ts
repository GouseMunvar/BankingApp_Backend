import express from "express"
import { RegisterUser,LoginUser,GetProfile} from "../Controllers/UserController"
import checkToken from "../MiddleWare/middleware"


const userRouter=express.Router()

userRouter.post("/register",RegisterUser)
userRouter.post("/login",LoginUser)
userRouter.get('/profile',checkToken,GetProfile)


export default userRouter