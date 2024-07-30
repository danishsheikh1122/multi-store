/*
  Warnings:

  - You are about to alter the column `value` on the `Sizes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Sizes` MODIFY `value` ENUM('xs', 'sm', 'md', 'lg', 'xl', 'xxl') NOT NULL;
