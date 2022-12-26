/*
  Warnings:

  - You are about to drop the column `amount` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `totalPrice` to the `CartOnProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "amount";

-- AlterTable
ALTER TABLE "CartOnProduct" ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "totalPrice" INTEGER NOT NULL;
