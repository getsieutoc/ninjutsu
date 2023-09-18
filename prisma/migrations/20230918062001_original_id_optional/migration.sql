-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_originalId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "originalId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_originalId_fkey" FOREIGN KEY ("originalId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
