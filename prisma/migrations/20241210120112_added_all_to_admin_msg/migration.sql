/*
  Warnings:

  - Added the required column `all` to the `AdminMsg` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdminMsg" ADD COLUMN     "all" BOOLEAN NOT NULL;
