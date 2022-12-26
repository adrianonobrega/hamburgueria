/*
  Warnings:

  - You are about to drop the column `amount` on the `Cart` table. All the data in the column will be lost.
  - The primary key for the `CartOnProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_CartOnProductToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `CartOnProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CartOnProductToProduct" DROP CONSTRAINT "_CartOnProductToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartOnProductToProduct" DROP CONSTRAINT "_CartOnProductToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "amount";

-- AlterTable
ALTER TABLE "CartOnProduct" DROP CONSTRAINT "CartOnProduct_pkey",
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
ADD CONSTRAINT "CartOnProduct_pkey" PRIMARY KEY ("productId", "cartId");

-- DropTable
DROP TABLE "_CartOnProductToProduct";

-- AddForeignKey
ALTER TABLE "CartOnProduct" ADD CONSTRAINT "CartOnProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
