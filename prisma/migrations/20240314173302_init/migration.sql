-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('gas', 'diesel', 'lpg', 'electric', 'hybrid');

-- CreateEnum
CREATE TYPE "TransmissionType" AS ENUM ('manual', 'automatic', 'semi_automatic');

-- CreateEnum
CREATE TYPE "CarState" AS ENUM ('broken', 'fine');

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "milage" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "fuel_type" "FuelType" NOT NULL,
    "transmission_type" "TransmissionType" NOT NULL,
    "horse_power" INTEGER NOT NULL,
    "engine_capacity" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "state" "CarState" NOT NULL,
    "carModelId" TEXT NOT NULL,
    "fuelTypeId" TEXT NOT NULL,
    "originId" TEXT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarMake" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CarMake_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Origin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Origin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "carMakeId" TEXT NOT NULL,

    CONSTRAINT "CarModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_carModelId_fkey" FOREIGN KEY ("carModelId") REFERENCES "CarModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_originId_fkey" FOREIGN KEY ("originId") REFERENCES "Origin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarModel" ADD CONSTRAINT "CarModel_carMakeId_fkey" FOREIGN KEY ("carMakeId") REFERENCES "CarMake"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
