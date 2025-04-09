/*
  Warnings:

  - Added the required column `endTime` to the `Talk` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Saved" DROP CONSTRAINT "Saved_eventId_fkey";

-- AlterTable
ALTER TABLE "Talk" ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL;
