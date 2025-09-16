import bcrypt from "bcrypt";
import express from "express";
import client from "../prisma/prisma.js";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../utils/utils.js";
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { name, email, role, password } = req.body;

  if (!name || !email || !role || !role) {
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
  const hashpassword = await bcrypt.hash(password, saltrounds);
  console.log("hash",hashpassword)
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
  const { email, password, role } = req.body;
  if ( !email || !role ||!password) {
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
    email,role
  },JWT_SECRET)

  return res.json(token).status(200)

});

export default userRouter;
