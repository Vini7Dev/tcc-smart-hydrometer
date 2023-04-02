-- CreateTable
CREATE TABLE "NewsImages" (
    "id" TEXT NOT NULL,
    "news_id" TEXT NOT NULL,
    "image_file" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NewsImages" ADD CONSTRAINT "NewsImages_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
