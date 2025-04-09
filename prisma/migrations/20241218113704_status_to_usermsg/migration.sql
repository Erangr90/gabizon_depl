/*
  Warnings:

  - You are about to drop the column `type` on the `UserMsg` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserMsgStatus" AS ENUM ('NEW', 'PENDING', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "UserMsg" DROP COLUMN "type",
ADD COLUMN     "status" "UserMsgStatus" NOT NULL DEFAULT 'NEW';
