/*
  Warnings:

  - You are about to drop the column `identidicacion` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `descipcion` on the `Concepto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identificacion]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identificacion` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Concepto` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Cliente_identidicacion_key";

-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "identidicacion",
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'Activo',
ADD COLUMN     "identificacion" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Concepto" DROP COLUMN "descipcion",
ADD COLUMN     "descripcion" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Gasto" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'Activo';

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_identificacion_key" ON "Cliente"("identificacion");
