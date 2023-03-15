/*
  Warnings:

  - Added the required column `name` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "selected" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "name" TEXT NOT NULL;
