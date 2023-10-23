-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "siteId" TEXT;

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "siteId" TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "siteId" TEXT;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "siteId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "siteId" TEXT;
