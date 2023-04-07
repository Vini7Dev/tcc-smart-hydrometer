-- CreateEnum
CREATE TYPE "ConsumptionCategory" AS ENUM ('COMMERCIAL_SOCIAL_ASSISTANCE', 'COMMERCIAL_NORMAL', 'INDUSTRIAL_NORMAL', 'PUBLIC_WITH_PROGRAM_AGREEMENT', 'PUBLIC_WITH_CONTRACT_PURE', 'PUBLIC_NORMAL', 'RESIDENTIAL_NORMAL', 'RESIDENTIAL_SOCIAL', 'RESIDENTIAL_VULNERABLE_NORMAL');

-- CreateTable
CREATE TABLE "hydrometers" (
    "id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "consumption_category" "ConsumptionCategory" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hydrometers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adresses" (
    "id" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "adresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hydrometers" ADD CONSTRAINT "hydrometers_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "adresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hydrometers" ADD CONSTRAINT "hydrometers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
