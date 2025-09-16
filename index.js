import cors from "cors";
import express from "express";
import userRouter from "./auth/auth.js";
import appointmentRouter from "./routes/appointment.js";
import bookingRouter from "./routes/booking.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", userRouter);
app.use("/", appointmentRouter);
app.use("/", bookingRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
