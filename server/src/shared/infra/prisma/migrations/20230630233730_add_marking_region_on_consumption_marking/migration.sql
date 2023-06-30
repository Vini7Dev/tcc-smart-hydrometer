-- CreateEnum
CREATE TYPE "MarkingRegion" AS ENUM ('NORTH', 'SOUTH', 'EAST', 'WEST');

-- AlterTable
ALTER TABLE "consumptionMarkings" ADD COLUMN     "marking_region" "MarkingRegion";
