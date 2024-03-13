import { Request, Response } from "express";
import { Vehicle } from "../models/vehicle.model";

// ? Obtain all vehicles
export const getVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al obtener los vehículos"]);
  }
};

// ? Obtain a vehicle
export const getVehicle = async (req: Request, res: Response) => {
  const vehicle = await Vehicle.findByPk(req.params.id);
  if (!vehicle) return res.status(404).json(["Vehículo no encontrado"]);
  res.json({ vehicle });
};

// ? Create a vehicle
export const createVehicle = async (req: Request, res: Response) => {
  const { plate, vehicleType_id, place_id } = req.body;
  try {
    const vehicleFound = await Vehicle.findOne({
      where: {
        plate: plate,
      },
    });
    if (vehicleFound) {
      return res.status(400).json(["Ya existe un vehículo con esa placa"]);
    }
    const newVehicle = await Vehicle.create({
      plate,
      vehicleType_id,
      place_id,
    });
    res.json(newVehicle);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al crear el vehículo"]);
  }
};

// ? Update a vehicle
export const updateVehicle = async (req: Request, res: Response) => {
  const { plate, vehicleType_id, place_id } = req.body;
  const vehicleFound = await Vehicle.findByPk(req.params.id);
  if (vehicleFound) {
    await vehicleFound.update({
      plate,
      vehicleType_id,
      place_id,
    });
  } else {
    return res.status(404).json(["Vehículo no encontrado"]);
  }
  res.json({ vehicleFound });
};

// ? Delete a vehicle
export const deleteVehicle = async (req: Request, res: Response) => {
  const vehicle = await Vehicle.findByPk(req.params.id);
  if (vehicle) {
    await vehicle.destroy();
    return res.sendStatus(204);
  } else {
    return res.status(404).json(["Vehículo no encontrado"]);
  }
};
