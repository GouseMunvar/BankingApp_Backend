import express from "express"
import dotenv from "dotenv"
import dbConnect from "./DB"
import userRouter from "./Routes/UserRoutes"
import accountRouter from "./Routes/AccountRoute"
import transactionRouter from "./Routes/TransactionRoute"
import cors from 'cors'

dotenv.config()

const app=express()

app.use(express.json())
app.use(cors())
app.use("/api/auth", userRouter)
app.use("/api", accountRouter)
app.use("/api", transactionRouter)

dbConnect()
.then(()=>{

    app.listen(process.env.PORT,()=>{
        console.log(`server is listening at ${process.env.PORT}`)
    })

})
.catch((error)=>{
    console.log("Database connection failed",error)
})