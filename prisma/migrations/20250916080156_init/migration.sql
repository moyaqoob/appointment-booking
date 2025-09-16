/*
  Warnings:

  - A unique constraint covering the columns `[professorId,timeSlot]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Appointment_professorId_timeSlot_key" ON "public"."Appointment"("professorId", "timeSlot");
