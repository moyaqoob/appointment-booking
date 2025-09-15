-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('STUDENT', 'PROFESSOR');

-- CreateEnum
CREATE TYPE "public"."AppointmentStatus" AS ENUM ('PENDING', 'CANCELLED', 'CONFIRMED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Availability" (
    "id" SERIAL NOT NULL,
    "professorId" INTEGER NOT NULL,
    "timeSlot" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Appointment" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "timeSlot" TIMESTAMP(3) NOT NULL,
    "status" "public"."AppointmentStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Availability" ADD CONSTRAINT "Availability_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Appointment" ADD CONSTRAINT "Appointment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Appointment" ADD CONSTRAINT "Appointment_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
