-- DropForeignKey
ALTER TABLE "Watched" DROP CONSTRAINT "Watched_eventId_fkey";

-- AlterTable
ALTER TABLE "Watched" ALTER COLUMN "eventId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Watched" ADD CONSTRAINT "Watched_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
