-- AlterTable
ALTER TABLE "User" ADD COLUMN     "adminMsgId" INTEGER;

-- CreateTable
CREATE TABLE "AdminMsg" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL DEFAULT '',
    "sentDate" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'הודעות',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminMsg_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_adminMsgId_fkey" FOREIGN KEY ("adminMsgId") REFERENCES "AdminMsg"("id") ON DELETE SET NULL ON UPDATE CASCADE;
