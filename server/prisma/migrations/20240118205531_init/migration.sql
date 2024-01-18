/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "deletedAt",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
