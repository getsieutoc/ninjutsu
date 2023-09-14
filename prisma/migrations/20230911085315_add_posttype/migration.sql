-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('DEFAULT', 'AUDIO', 'VIDEO', 'YOUTUBE');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "featuredImage" TEXT,
ADD COLUMN     "type" "PostType" DEFAULT 'DEFAULT';
