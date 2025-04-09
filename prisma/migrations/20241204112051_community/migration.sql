/*
  Warnings:

  - You are about to drop the column `colors` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the `Comunity` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bg` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soft` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solid` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Community" DROP COLUMN "colors",
ADD COLUMN     "bg" TEXT NOT NULL,
ADD COLUMN     "soft" TEXT NOT NULL,
ADD COLUMN     "solid" TEXT NOT NULL;

-- DropTable
DROP TABLE "Comunity";
