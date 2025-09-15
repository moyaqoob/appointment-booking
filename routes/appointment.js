import express from "express";
import { profMiddleware } from "../middleware/middleware";
import client from "../prisma/prisma";
const appointmentRouter = express.Router();

appointmentRouter.post("/availabilty", profMiddleware, async (req, res) => {
  const { professorId, timeslots } = req.body;
  await Promise.all(
    timeslots.map((slot) => {
      client.availability.create({
        data: {
          professorId: professorId,
          timeSlot: slot,
        },
      });
    })
  );

  res.json({ message: "slots created" }).status(200);
});

appointmentRouter.post("/:id/cancel", profMiddleware, async (req, res) => {
  const appointmentId = parseInt(req.params.id);
  const { professorId } = req.userId;

  const appointment = await client.appointment.findUnique({
    where: {
      id: appointmentId,
    },
  });

  if (!appointment) {
    res.status(403).json({ error: "Appointment Not Found" });
  }

  if (appointment.professorId !== professorId) {
    res.status(403).json({ error: "Not authorized to cancel the appointment" });
    return;
  }

  const updated = await client.appointment.update({
    where: { id: studentId },
    data: { status: "CANCELED" },
  });

  if (!updated) {
    return res.json({
      message: "cant cancel the appoint",
    });
  }
  res.json({message: "Appointment canceled successfully"}).status(200);
});
