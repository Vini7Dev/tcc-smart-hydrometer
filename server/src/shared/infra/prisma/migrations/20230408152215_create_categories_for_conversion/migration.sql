-- CreateTable
CREATE TABLE "categoriesForConversion" (
    "id" TEXT NOT NULL,
    "city_for_conversion_id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categoriesForConversion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "categoriesForConversion" ADD CONSTRAINT "categoriesForConversion_city_for_conversion_id_fkey" FOREIGN KEY ("city_for_conversion_id") REFERENCES "citiesForConversion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
