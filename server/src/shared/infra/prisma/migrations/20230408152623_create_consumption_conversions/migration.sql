-- CreateTable
CREATE TABLE "consumptionConversions" (
    "id" TEXT NOT NULL,
    "category_for_conversion_id" TEXT NOT NULL,
    "water_rate" INTEGER NOT NULL,
    "sewer_rate" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consumptionConversions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "consumptionConversions" ADD CONSTRAINT "consumptionConversions_category_for_conversion_id_fkey" FOREIGN KEY ("category_for_conversion_id") REFERENCES "categoriesForConversion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
