/*
  Warnings:

  - You are about to drop the `Msgs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceMsgs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MsgsToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Msgs" DROP CONSTRAINT "Msgs_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceMsgs" DROP CONSTRAINT "ServiceMsgs_userId_fkey";

-- DropForeignKey
ALTER TABLE "_MsgsToUser" DROP CONSTRAINT "_MsgsToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MsgsToUser" DROP CONSTRAINT "_MsgsToUser_B_fkey";

-- DropTable
DROP TABLE "Msgs";

-- DropTable
DROP TABLE "ServiceMsgs";

-- DropTable
DROP TABLE "_MsgsToUser";

-- CreateTable
CREATE TABLE "Msg" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "sentDate" TIMESTAMP(3) NOT NULL,
    "desc" TEXT NOT NULL DEFAULT '',
    "creatorId" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'הודעות',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Msg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceMsg" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "sentDate" TIMESTAMP(3) NOT NULL,
    "desc" TEXT NOT NULL DEFAULT '',
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'הודעות',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceMsg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MsgToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MsgToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MsgToUser_B_index" ON "_MsgToUser"("B");

-- AddForeignKey
ALTER TABLE "Msg" ADD CONSTRAINT "Msg_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceMsg" ADD CONSTRAINT "ServiceMsg_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MsgToUser" ADD CONSTRAINT "_MsgToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Msg"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MsgToUser" ADD CONSTRAINT "_MsgToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
