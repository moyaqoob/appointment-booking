import bcrypt from "bcrypt";
import express from "express";
import client from "../prisma/prisma";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../utils/utils";
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { name, email, role, password } = req.body;

  if (!name || !email || !role) {
    res.json("empty fields").status(403);
    return;
  }
  const userExists = await client.user.findFirst({
    where: {
      email: email,
    },
  });

  if (userExists) {
    res.json("User already exists").status(404);
    return;
  }
  const saltrounds = 10;
  const hashpassword = bcrypt.hash(password, saltrounds);
  await client.user.create({
    data: {
      name: name,
      email: email,
      role: role,
      password: hashpassword,
    },
  });
  return res.status(200).json("signup successful");
});

userRouter.post("/login", async(req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !role ||!password) {
    res.json("empty fields").status(403);
    return;
  }
  const userExists = await client.user.findUnique({
    where:{
        email:email,
    }
  })
  if(!userExists){
    res.json({
        message:"user does not exist"
    }).status(403);
    return;
  }
  const token  = jwt.sign({
    email:email,password:password
  },JWT_SECRET,{
    expiresIn:"1h"
  })

  res.json(token).status(200)

});

export default userRouter;
