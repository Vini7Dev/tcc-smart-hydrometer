-- CreateTable
CREATE TABLE "ForgotPasswordTokens" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "ForgotPasswordTokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ForgotPasswordTokens_user_id_key" ON "ForgotPasswordTokens"("user_id");

-- AddForeignKey
ALTER TABLE "ForgotPasswordTokens" ADD CONSTRAINT "ForgotPasswordTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
