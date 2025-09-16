import jwt from "jsonwebtoken";
import client from "../prisma/prisma.js";
import { JWT_SECRET } from "../utils/utils.js";

async function profMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    const verifyToken = jwt.verify(token, JWT_SECRET);

    const user  = await client.user.findUnique({
        where:{
            id:verifyToken.userId
        }
    })

    if(!user){
        res.status(403).json({
            message:"User doesnt exist"
        })
        return;
    }
    console.log("user",user.email,user.name,user.password,
        user.role
    )

    if(user.role !== "PROFESSOR"){
        res.status(403).json("you are not professor")
        return;
    }

    req.userId = verifyToken.userId;
    console.log("user id",req.userId)
    next();
  } catch (error) {
    console.error("JWT error:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

async function userMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    const verifyToken = jwt.verify(token, JWT_SECRET);

     const user  = await client.user.findUnique({
        where:{
            id:verifyToken.userId
        }
    })

    if(!user){
        res.status(403).json({
            message:"User doesnt exist"
        })
        return;
    }
    // console.log("user",user.email,user.name,user.password,
    //     user.role
    // )

    if(user.role !== "STUDENT"){
        res.status(403).json("you are not professor")
        return;
    }

    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    console.error("JWT error:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}


export { profMiddleware, userMiddleware };
