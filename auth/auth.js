import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import client from "../prisma/prisma.js";
import { JWT_SECRET } from "../utils/utils.js";
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { name, email, role, password } = req.body;

  if (!name || !email || !role || !password) {
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
  console.log("hash", hashpassword);
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

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const userExists = await client.user.findUnique({
      where: { email },
    });

    if (!userExists) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const validPassword = await bcrypt.compare(password, userExists.password);
    if (!validPassword) {
      return res.status(403).json({ message: "Invalid password" });
    }
    console.log("valid passowr")

    const token = jwt.sign(
      { userId: userExists.id, role: userExists.role },
      process.env.JWT_SECRET
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default userRouter;
