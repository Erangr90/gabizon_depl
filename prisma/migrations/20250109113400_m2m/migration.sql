/*
  Warnings:

  - You are about to drop the `_PostBonuses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PostBonuses" DROP CONSTRAINT "_PostBonuses_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostBonuses" DROP CONSTRAINT "_PostBonuses_B_fkey";

-- DropTable
DROP TABLE "_PostBonuses";

-- CreateTable
CREATE TABLE "_BonusToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BonusToPost_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BonusToPost_B_index" ON "_BonusToPost"("B");

-- AddForeignKey
ALTER TABLE "_BonusToPost" ADD CONSTRAINT "_BonusToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Bonus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BonusToPost" ADD CONSTRAINT "_BonusToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
