/*
  Warnings:

  - A unique constraint covering the columns `[username,role]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Users_username_key";

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_role_key" ON "Users"("username", "role");
