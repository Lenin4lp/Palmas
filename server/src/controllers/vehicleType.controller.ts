import { Request, Response } from "express";
import { VehicleType } from "../models/vehicleType.model";

// ? Obtain all vehicle types
export const getVehicleTypes = async (req: Request, res: Response) => {
  try {
    const vehicleTypes = await VehicleType.findAll();
    res.json(vehicleTypes);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al obtener los tipos de vehículos"]);
  }
};

// ? Obtain a vehicle type
export const getVehicleType = async (req: Request, res: Response) => {
  const vehicleType = await VehicleType.findByPk(req.params.id);
  if (!vehicleType)
    return res.status(404).json(["Tipo de vehículo no encontrado"]);
  res.json({ vehicleType });
};

// ? Create a vehicle type
export const createVehicleType = async (req: Request, res: Response) => {
  const { vehicleType } = req.body;
  try {
    const vehicleTypeFound = await VehicleType.findOne({
      where: {
        vehicleType: vehicleType,
      },
    });
    if (vehicleTypeFound) {
      return res
        .status(400)
        .json(["Ya existe un tipo de vehículo con ese nombre"]);
    }
    const newVehicleType = await VehicleType.create({
      vehicleType,
    });
    res.json(newVehicleType);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al crear el tipo de vehículo"]);
  }
};

// ? Update a place
export const updateVehicleType = async (req: Request, res: Response) => {
  const { vehicleType } = req.body;
  const vehicleTypeFound = await VehicleType.findByPk(req.params.id);
  if (vehicleTypeFound) {
    await vehicleTypeFound.update({
      vehicleType,
    });
  } else {
    return res.status(404).json(["Tipo de vehículo no encontrado"]);
  }
  res.json({ vehicleTypeFound });
};

// ? Delete a vehicle type
export const deleteVehicleType = async (req: Request, res: Response) => {
  const vehicleType = await VehicleType.findByPk(req.params.id);
  if (vehicleType) {
    await vehicleType.destroy();
    return res.sendStatus(204);
  } else {
    return res.status(404).json(["Tipo de vehículo no encontrado"]);
  }
};
