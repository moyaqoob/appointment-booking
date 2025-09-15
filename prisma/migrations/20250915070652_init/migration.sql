/*
  Warnings:

  - A unique constraint covering the columns `[professorId,timeSlot]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Availability_professorId_timeSlot_key" ON "public"."Availability"("professorId", "timeSlot");
