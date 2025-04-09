/*
  Warnings:

  - You are about to drop the `Msg` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MsgToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Msg" DROP CONSTRAINT "Msg_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "_MsgToUser" DROP CONSTRAINT "_MsgToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MsgToUser" DROP CONSTRAINT "_MsgToUser_B_fkey";

-- AlterTable
ALTER TABLE "Creator" ALTER COLUMN "img" DROP NOT NULL;

-- DropTable
DROP TABLE "Msg";

-- DropTable
DROP TABLE "_MsgToUser";
