import express from "express"

import checkToken from "../MiddleWare/middleware"
import { transferMoney,getTransactions } from "../Controllers/TransactionController"

const transactionRouter=express.Router()

transactionRouter.post("/transferMoney",checkToken,transferMoney)
transactionRouter.get("/transaction",checkToken,getTransactions)



export default transactionRouter