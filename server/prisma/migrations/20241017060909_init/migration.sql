/*
  Warnings:

  - Changed the type of `due_date` on the `Invoice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "due_date",
ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL;
