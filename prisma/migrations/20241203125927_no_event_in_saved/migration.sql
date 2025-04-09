-- DropForeignKey
ALTER TABLE "Saved" DROP CONSTRAINT "Saved_eventId_fkey";

-- AlterTable
ALTER TABLE "Saved" ALTER COLUMN "eventId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
