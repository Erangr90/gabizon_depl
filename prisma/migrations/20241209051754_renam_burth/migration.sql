/*
  Warnings:

  - You are about to drop the column `birthDate` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User"
RENAME COLUMN "birthDate" TO "birthday";
