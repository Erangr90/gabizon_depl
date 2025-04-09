/*
  Warnings:

  - You are about to drop the `_CommunityToCreator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CommunityToCreator" DROP CONSTRAINT "_CommunityToCreator_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommunityToCreator" DROP CONSTRAINT "_CommunityToCreator_B_fkey";

-- AlterTable
ALTER TABLE "Creator" ADD COLUMN     "communityId" INTEGER;

-- DropTable
DROP TABLE "_CommunityToCreator";

-- AddForeignKey
ALTER TABLE "Creator" ADD CONSTRAINT "Creator_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE SET NULL ON UPDATE CASCADE;
