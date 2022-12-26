/*
  Warnings:

  - You are about to drop the column `amount` on the `CartOnProduct` table. All the data in the column will be lost.
  - You are about to drop the `_CartToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CartToProduct" DROP CONSTRAINT "_CartToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartToProduct" DROP CONSTRAINT "_CartToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CartOnProduct" DROP COLUMN "amount";

-- DropTable
DROP TABLE "_CartToProduct";

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
