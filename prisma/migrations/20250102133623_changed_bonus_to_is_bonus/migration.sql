/*
  Warnings:

  - You are about to drop the column `bonus` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `planId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_communityId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_planId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "bonus",
DROP COLUMN "planId",
ADD COLUMN     "bonusId" INTEGER,
ADD COLUMN     "isBonus" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Plan";

-- CreateTable
CREATE TABLE "Bonus" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "communityId" INTEGER NOT NULL,
    "img" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bonus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_bonusId_fkey" FOREIGN KEY ("bonusId") REFERENCES "Bonus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bonus" ADD CONSTRAINT "Bonus_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
