/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `seasonId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Season` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_communityId_fkey";

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "creatorId",
DROP COLUMN "date",
DROP COLUMN "desc",
DROP COLUMN "endTime",
DROP COLUMN "startTime";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "seasonId",
ADD COLUMN     "planId" INTEGER;

-- DropTable
DROP TABLE "Season";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
