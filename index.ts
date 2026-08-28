import express from "express"
import dotenv from "dotenv"
import dbConnect from "./DB"
import userRouter from "./Routes/UserRoutes"
import accountRouter from "./Routes/AccountRoute"
import transactionRouter from "./Routes/TransactionRoute"

dotenv.config()

const app=express()

app.use(express.json())
app.use(userRouter)
app.use(accountRouter)
app.use(transactionRouter)

dbConnect()


app.listen(process.env.PORT,()=>{
    console.log("sever is listening at 8000")
})