import express from "express"
import bcrypt from "bcrypt"
import cors from "cors"
import userRouter from "./auth/auth";


const app = express()
app.use(cors());
app.use(express.json())



app.use("/",userRouter);