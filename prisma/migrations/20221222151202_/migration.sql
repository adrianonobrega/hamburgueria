/*
  Warnings:

  - The primary key for the `CartOnProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `CartOnProduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CartOnProduct" DROP CONSTRAINT "CartOnProduct_productId_fkey";

-- AlterTable
ALTER TABLE "CartOnProduct" DROP CONSTRAINT "CartOnProduct_pkey",
DROP COLUMN "productId",
ADD CONSTRAINT "CartOnProduct_pkey" PRIMARY KEY ("cartId");

-- CreateTable
CREATE TABLE "_CartOnProductToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CartOnProductToProduct_AB_unique" ON "_CartOnProductToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CartOnProductToProduct_B_index" ON "_CartOnProductToProduct"("B");

-- AddForeignKey
ALTER TABLE "_CartOnProductToProduct" ADD CONSTRAINT "_CartOnProductToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "CartOnProduct"("cartId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartOnProductToProduct" ADD CONSTRAINT "_CartOnProductToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
