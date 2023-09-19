-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "originalId" TEXT;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_originalId_fkey" FOREIGN KEY ("originalId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
