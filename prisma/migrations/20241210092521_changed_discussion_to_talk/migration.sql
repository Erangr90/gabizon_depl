/*
  Warnings:

  - You are about to drop the `Discussion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Discussion" DROP CONSTRAINT "Discussion_communityId_fkey";

-- DropTable
DROP TABLE "Discussion";

-- CreateTable
CREATE TABLE "Talk" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "communityId" INTEGER NOT NULL,

    CONSTRAINT "Talk_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Talk" ADD CONSTRAINT "Talk_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
