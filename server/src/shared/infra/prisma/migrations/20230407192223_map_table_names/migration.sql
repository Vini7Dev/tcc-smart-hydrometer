/*
  Warnings:

  - You are about to drop the `ForgotPasswordTokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `News` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NewsImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ForgotPasswordTokens" DROP CONSTRAINT "ForgotPasswordTokens_user_id_fkey";

-- DropForeignKey
ALTER TABLE "NewsImages" DROP CONSTRAINT "NewsImages_news_id_fkey";

-- DropTable
DROP TABLE "ForgotPasswordTokens";

-- DropTable
DROP TABLE "News";

-- DropTable
DROP TABLE "NewsImages";

-- CreateTable
CREATE TABLE "forgotPasswordTokens" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "forgotPasswordTokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsImages" (
    "id" TEXT NOT NULL,
    "news_id" TEXT NOT NULL,
    "image_file" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsImages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "forgotPasswordTokens_user_id_key" ON "forgotPasswordTokens"("user_id");

-- AddForeignKey
ALTER TABLE "forgotPasswordTokens" ADD CONSTRAINT "forgotPasswordTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "newsImages" ADD CONSTRAINT "newsImages_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
