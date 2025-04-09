/*
  Warnings:

  - You are about to drop the column `time` on the `Post` table. All the data in the column will be lost.
  - Added the required column `date` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "time",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL;
