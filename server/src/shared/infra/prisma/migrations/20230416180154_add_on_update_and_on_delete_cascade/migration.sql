-- DropForeignKey
ALTER TABLE "categoriesForConversion" DROP CONSTRAINT "categoriesForConversion_city_for_conversion_id_fkey";

-- DropForeignKey
ALTER TABLE "consumptionConversions" DROP CONSTRAINT "consumptionConversions_category_for_conversion_id_fkey";

-- DropForeignKey
ALTER TABLE "forgotPasswordTokens" DROP CONSTRAINT "forgotPasswordTokens_user_id_fkey";

-- DropForeignKey
ALTER TABLE "newsImages" DROP CONSTRAINT "newsImages_news_id_fkey";

-- AddForeignKey
ALTER TABLE "forgotPasswordTokens" ADD CONSTRAINT "forgotPasswordTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "newsImages" ADD CONSTRAINT "newsImages_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoriesForConversion" ADD CONSTRAINT "categoriesForConversion_city_for_conversion_id_fkey" FOREIGN KEY ("city_for_conversion_id") REFERENCES "citiesForConversion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumptionConversions" ADD CONSTRAINT "consumptionConversions_category_for_conversion_id_fkey" FOREIGN KEY ("category_for_conversion_id") REFERENCES "categoriesForConversion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
