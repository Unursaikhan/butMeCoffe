/*
  Warnings:

  - You are about to drop the `Dontations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `CVC` to the `Bankcard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dontations" DROP CONSTRAINT "Dontations_recipientId_fkey";

-- AlterTable
ALTER TABLE "Bankcard" ADD COLUMN     "CVC" TEXT NOT NULL,
ALTER COLUMN "expiryDate" SET DATA TYPE TEXT,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Dontations";

-- CreateTable
CREATE TABLE "Donations" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "specialMessage" TEXT NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Donations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donations_recipientId_key" ON "Donations"("recipientId");

-- AddForeignKey
ALTER TABLE "Donations" ADD CONSTRAINT "Donations_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
