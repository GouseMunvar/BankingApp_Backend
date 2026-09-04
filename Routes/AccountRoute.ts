import express from "express"
import { depositAmount, getBalance, withdrawAmount } from "../Controllers/AccountController"
import checkToken from "../MiddleWare/middleware"


const accountRouter=express.Router()


accountRouter.post("/deposit",checkToken,depositAmount)
accountRouter.get("/balance",checkToken,getBalance)
accountRouter.post('/withdraw',checkToken,withdrawAmount)


export default accountRouter