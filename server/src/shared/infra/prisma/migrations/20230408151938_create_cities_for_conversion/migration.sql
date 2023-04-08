-- CreateTable
CREATE TABLE "citiesForConversion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_update" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "citiesForConversion_pkey" PRIMARY KEY ("id")
);
