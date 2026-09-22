import express from "express"
import { RegisterUser,LoginUser,GetProfile,UpdatePassword} from "../Controllers/UserController"
import checkToken from "../MiddleWare/middleware"


const userRouter=express.Router()

userRouter.post("/register",RegisterUser)
userRouter.post("/login",LoginUser)
userRouter.get('/profile',checkToken,GetProfile)
userRouter.put("/update-password", checkToken, UpdatePassword);


export default userRouter