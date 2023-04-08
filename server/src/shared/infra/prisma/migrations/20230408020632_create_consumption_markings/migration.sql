-- CreateTable
CREATE TABLE "consumptionMarkings" (
    "id" TEXT NOT NULL,
    "hydrometer_id" INTEGER NOT NULL,
    "consumption" INTEGER NOT NULL,
    "monetary_value" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consumptionMarkings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "consumptionMarkings_hydrometer_id_key" ON "consumptionMarkings"("hydrometer_id");

-- AddForeignKey
ALTER TABLE "consumptionMarkings" ADD CONSTRAINT "consumptionMarkings_hydrometer_id_fkey" FOREIGN KEY ("hydrometer_id") REFERENCES "hydrometers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
