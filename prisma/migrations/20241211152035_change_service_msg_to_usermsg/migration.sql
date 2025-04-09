/*
  Warnings:

  - You are about to drop the `ServiceMsg` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `title` on the `Talk` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ServiceMsg" DROP CONSTRAINT "ServiceMsg_userId_fkey";

-- AlterTable
ALTER TABLE "Talk" DROP COLUMN "title",
ADD COLUMN     "title" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "ServiceMsg";

-- CreateTable
CREATE TABLE "UserMsg" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL DEFAULT '',
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'הודעות',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserMsg_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserMsg" ADD CONSTRAINT "UserMsg_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
