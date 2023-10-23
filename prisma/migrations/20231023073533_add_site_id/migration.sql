/*
  Warnings:

  - Added the required column `siteId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siteId` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siteId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siteId` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siteId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "siteId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "siteId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "siteId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "siteId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "siteId" TEXT NOT NULL;
