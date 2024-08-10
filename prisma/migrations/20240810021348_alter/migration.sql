-- AlterTable
ALTER TABLE "Barbershop" ADD COLUMN     "hoursAvailable" TEXT[] DEFAULT ARRAY['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']::TEXT[];
