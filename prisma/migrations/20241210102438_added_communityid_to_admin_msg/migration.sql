/*
  Warnings:

  - Added the required column `communityId` to the `AdminMsg` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdminMsg" ADD COLUMN     "communityId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Talk" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "AdminMsg" ADD CONSTRAINT "AdminMsg_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
