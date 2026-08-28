import express from "express"
import { depositAmount, getBalance } from "../Controllers/AccountController"
import checkToken from "../MiddleWare/middleware"


const accountRouter=express.Router()


accountRouter.post("/depositMoney",checkToken,depositAmount)
accountRouter.get("/balance",checkToken,getBalance)


export default accountRouter