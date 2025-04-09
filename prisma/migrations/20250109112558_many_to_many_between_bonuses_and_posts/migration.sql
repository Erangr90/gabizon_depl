/*
  Warnings:

  - You are about to drop the column `bonusId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_bonusId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "bonusId";

-- CreateTable
CREATE TABLE "_PostBonuses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PostBonuses_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PostBonuses_B_index" ON "_PostBonuses"("B");

-- AddForeignKey
ALTER TABLE "_PostBonuses" ADD CONSTRAINT "_PostBonuses_A_fkey" FOREIGN KEY ("A") REFERENCES "Bonus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostBonuses" ADD CONSTRAINT "_PostBonuses_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
