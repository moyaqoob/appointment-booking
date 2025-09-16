import express from "express";
import { userMiddleware } from "../middleware/middleware.js";
import client from "../prisma/prisma.js";

const bookingRouter = express();

bookingRouter.post("/test",userMiddleware,async(req,res)=>{
    console.log("the user middleware has passed")
    res.json({
        message:"the middleware has passed"
    }).status(200)
})


bookingRouter.get("/timeSlot/:professorId",userMiddleware,async (req, res) => {
    const professorId = Number(req.params.professorId);
    const timeSlots = await client.appointment.findMany({
      where: { professorId },
      select: { timeSlot: true },
    });

    if (!timeSlots.length) {
      return res.status(404).json({ message: "Time slots not available" });
    }

    res.json(timeSlots);
  }
);

bookingRouter.post("/book/:professorId", userMiddleware, async (req, res) => {
  const professorId = Number(req.params.professorId);
  const { timeSlot } = req.body;

  const slot = await client.appointment.findFirst({
    where: { professorId, timeSlot },
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
