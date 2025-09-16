import jwt from "jsonwebtoken";
import client from "../prisma/prisma.js";
import { JWT_SECRET } from "../utils/utils.js";

async function profMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    const verifyToken = jwt.verify(token, JWT_SECRET);

    const user = await client.user.findUnique({
      where: { id: verifyToken.userId },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (user.role !== "PROFESSOR") {
      return res.status(403).json({ error: "Forbidden: not a professor" });
    }

    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    console.error("JWT error:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

async function userMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken = jwt.verify(token, JWT_SECRET);

    if (!verifyToken) {
      return res.status(401).send("Token error");
    }
    const user = await client.user.findUnique(verifyToken.userId);

    if (user.role !== "STUDENT") {
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

export { profMiddleware, userMiddleware };
