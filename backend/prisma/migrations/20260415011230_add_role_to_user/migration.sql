-- CreateEnum
CREATE TYPE "Role" AS ENUM ('READER', 'AUTHOR');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'READER';
