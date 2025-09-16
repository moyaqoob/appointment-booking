import express from "express";
import { userMiddleware } from "../middleware/middleware.js";
import client from "../prisma/prisma.js";

const bookingRouter = express();

bookingRouter.post("/testuser",userMiddleware,async(req,res)=>{
    console.log("the user middleware has passed",req.body)
    res.json({
        message:"the middleware has passed"
    }).status(200)
})


bookingRouter.get("/timeSlot/:professorId",userMiddleware,async (req, res) => {
    const professorId = Number(req.params.professorId);
    const timeSlots = await client.availability.findMany({
      where: { professorId:professorId },
      select: { timeSlot: true },
    });
    console.log("timeSlots",timeSlots)

    if (!timeSlots.length) {
      return res.status(404).json({ message: "Time slots not available" });
    }

    res.status(200).json(timeSlots);
  }
);

bookingRouter.post("/book/:professorId", userMiddleware, async (req, res) => {
  const id = Number(req.params.professorId);
  const { timeSlot } = req.body;

  const slot = await client.appointment.findFirst({
    where: { id, timeSlot },
  });

  if (!slot || slot.status !== "PENDING") {
    return res.status(403).json({ message: "Time slot not available" });
  }

  await client.appointment.create({
    data: {
      status: "CONFIRMED",
      studentId: req.userId,
      professorId: professorId,
    },
  });

  res.json({ message: "Slot booked successfully" });
});

export default bookingRouter;
