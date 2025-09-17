import express from "express";
import { userMiddleware } from "../middleware/middleware.js";
import client from "../prisma/prisma.js";

const bookingRouter = express();

bookingRouter.post("/testuser", userMiddleware, async (req, res) => {
  console.log("the user middleware has passed");
  res
    .json({
      message: "the  middleware has passed",
    })
    .status(200);
});

bookingRouter.get(
  "/timeSlot/:professorId",
  userMiddleware,
  async (req, res) => {
    try {
      const professorId = Number(req.params.professorId);
      const timeSlots = await client.availability.findMany({
        where: { professorId: professorId },
        select: { timeSlot: true },
      });
      console.log("timeSlots", timeSlots);

      if (!timeSlots.length) {
        return res.status(404).json({ message: "Time slots not available" });
      }

      res.status(200).json(timeSlots);
    } catch (err) {
      console.error("Server error occured");
      return res.status(403).json({
        message: "server error occureed",
      });
    }
  }
);

bookingRouter.post("/book/:professorId", userMiddleware, async (req, res) => {
  try {
    const professorId = Number(req.params.professorId);
    const { timeSlot } = req.body;
    const parsedSlot = new Date(timeSlot);

    console.log("timeSlot", parsedSlot);

    const availableSlot = await client.availability.findUnique({
      where: {
        professorId_timeSlot: {
          professorId,
          timeSlot: parsedSlot,
        },
      },
      include: {
        professor: true,
      },
    });

    if (!availableSlot) {
      return res.status(403).json({ message: "Time slot not found" });
    }

    console.log(
      "available slot",
      availableSlot.professor.name,
      "id",
      availableSlot.professor.email,
      availableSlot.timeSlot
    );

    await client.$transaction(async (tx) => {
      await tx.appointment.create({
        data: {
          status: "CONFIRMED",
          studentId: req.userId,
          professorId,
          timeSlot: parsedSlot, 
        },
      });

      await tx.availability.delete({
        where: {
          professorId_timeSlot: {
            professorId,
            timeSlot: parsedSlot,
          },
        },
      });
    });

    return res.json({ message: "Slot booked successfully" });
  } catch (err) {
    console.error("Server error occured", err);
    return res.status(403).json({ message: "Server error occured" });
  }
});

export default bookingRouter;
