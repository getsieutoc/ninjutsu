/*
  Warnings:

  - You are about to drop the column `published` on the `Post` table. All the data in the column will be lost.
  - Added the required column `originalId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "isBlog" BOOLEAN,
ADD COLUMN     "meta" JSONB DEFAULT '[{}]';

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "published",
ADD COLUMN     "originalId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_originalId_fkey" FOREIGN KEY ("originalId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
