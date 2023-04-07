-- DropForeignKey
ALTER TABLE "hydrometers" DROP CONSTRAINT "hydrometers_address_id_fkey";

-- DropForeignKey
ALTER TABLE "hydrometers" DROP CONSTRAINT "hydrometers_user_id_fkey";

-- AlterTable
ALTER TABLE "hydrometers" ALTER COLUMN "address_id" DROP NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "hydrometers" ADD CONSTRAINT "hydrometers_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "adresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hydrometers" ADD CONSTRAINT "hydrometers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
