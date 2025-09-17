import express from "express";
import { profMiddleware } from "../middleware/middleware.js";
import client from "../prisma/prisma.js";
const appointmentRouter = express.Router();

appointmentRouter.post("/test", profMiddleware, async (req, res) => {
  console.log("the professor middleware has passed");

  res.json({
      message: "the middleware has passed",
  }).status(200);
});

appointmentRouter.post("/createSlots", profMiddleware, async (req, res) => {
  const { timeslots } = req.body;
  console.log("req userid", req.userId);
  const createSlot = await client.availability.createMany({
    data: timeslots.map((slot) => ({
      professorId: req.userId,
      timeSlot: new Date(slot),
    })),
    skipDuplicates: true,
  });
  if (!createSlot) {
    res
      .json({
        message: "Slots cannot created",
      })
      .status(403);
  }
  res.json({ message: "slots created" }).status(200);
});

appointmentRouter.get("/appointments", profMiddleware, async (req, res) => {
  try {
    const {professorId} = Number(req.userId)
    const apts = await client.appointment.findMany({
      where: {
        professorId: professorId,
        status: "CONFIRMED",
      },

    });

    console.log("apts",apts)

    
    res.json({
      apts
    });
  } catch (err) {
    console.error("Server error occured");
    return;
  }
});

appointmentRouter.post("/cancel/:id", profMiddleware, async (req, res) => {
  try {
    const appointmentId = Number(req.params.id);
    const professorId = Number(req.userId); // set by profMiddleware

    const appointment = await client.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment Not Found" });
    }

    console.log(
      "appt",
      appointment.professorId,
      "studentid",
      appointment.studentId,
      "timeSlot",
      appointment.timeSlot,
      "reqid",
      req.userId
    );

    if (appointment.professorId !== professorId) {
      return res.status(403).json({ error: "Not authorized to cancel the appointment" });
    }

    const updated = await client.appointment.update({
      where: { id: appointmentId },
      data: { status: "CANCELLED" },
    });

    return res.status(200).json({ message: "Appointment canceled successfully" });
  } catch (err) {
    console.error("Server error occurred", err);
    return res.status(500).json({ error: "Server error occurred" });
  }
});


export default appointmentRouter;
