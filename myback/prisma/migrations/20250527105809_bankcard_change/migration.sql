/*
  Warnings:

  - You are about to drop the column `catdNumber` on the `Bankcard` table. All the data in the column will be lost.
  - Added the required column `cardNumber` to the `Bankcard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bankcard" DROP COLUMN "catdNumber",
ADD COLUMN     "cardNumber" TEXT NOT NULL;
