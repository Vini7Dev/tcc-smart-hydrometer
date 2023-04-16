/*
  Warnings:

  - Added the required column `rule` to the `consumptionConversions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "consumptionConversions" ADD COLUMN     "rule" TEXT NOT NULL;
