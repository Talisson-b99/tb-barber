/*
  Warnings:

  - A unique constraint covering the columns `[serviceId,date,barbershopId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `barbershopId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Booking_serviceId_date_key";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "barbershopId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_serviceId_date_barbershopId_key" ON "Booking"("serviceId", "date", "barbershopId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "Barbershop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
