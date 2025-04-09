/*
  Warnings:

  - You are about to drop the column `link` on the `Post` table. All the data in the column will be lost.
  - Added the required column `yt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zoom` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "link",
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sum" TEXT[],
ADD COLUMN     "yt" TEXT NOT NULL,
ADD COLUMN     "zoom" TEXT NOT NULL;
