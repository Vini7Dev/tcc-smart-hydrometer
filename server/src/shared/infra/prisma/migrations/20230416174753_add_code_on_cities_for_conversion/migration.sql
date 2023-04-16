/*
  Warnings:

  - Added the required column `code` to the `citiesForConversion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "citiesForConversion" ADD COLUMN     "code" INTEGER NOT NULL;
