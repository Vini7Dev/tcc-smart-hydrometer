-- DropForeignKey
ALTER TABLE "news" DROP CONSTRAINT "news_user_id_fkey";

-- AlterTable
ALTER TABLE "news" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
