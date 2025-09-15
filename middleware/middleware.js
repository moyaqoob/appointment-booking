import jwt from "jsonwebtoken";
import client from "../prisma/prisma";
import { JWT_SECRET } from "../utils/utils";

async function profMiddleware(req,res,next){
    try {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken = jwt.verify(token, JWT_SECRET);
    
    if (!verifyToken) {
      return res.status(401).send("Token error");
    }
    const user = await client.user.findUnique(verifyToken.userId)
    
    if(user.role !=="PROFESSOR"){
        res.json("Role undefined").status(403);
        return;
    }
    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function userMiddleware(req,res,next){
    try {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken = jwt.verify(token, JWT_SECRET);
    
    if (!verifyToken) {
      return res.status(401).send("Token error");
    }
    const user = await client.user.findUnique(verifyToken.userId)
    
    if(user.role !=="STUDENT"){
        res.json("Role undefined").status(403);
        return;
    }
    req.userId = verifyToken.userId;
    next();
    

    next();
  } catch (error) {
    console.log(error);
    return error;
  }
}

export {profMiddleware,userMiddleware}