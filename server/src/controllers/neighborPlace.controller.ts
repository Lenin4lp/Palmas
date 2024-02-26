import { Request, Response } from "express";
import { NeighborPlace } from "../models/neighborPlace.model";

// ? Register a neighborPlace
export const createNeighborPlace = async (req: Request, res: Response) => {
  const { id: place_id } = req.params;
  const { neighbor_id } = req.body;
  try {
    const neighborFound = await NeighborPlace.findOne({
      where: {
        neighbor_id: neighbor_id,
        place_id: place_id,
      },
    });
    if (neighborFound)
      return res.status(400).json(["Ya existe un vecino con este inmueble"]);
    const newNeighborPlace = await NeighborPlace.create({
      place_id,
      neighbor_id,
    });
    res.json(newNeighborPlace);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al registrar el vecino en el inmueble"]);
  }
};

// ? Delete a neighborPlace
export const deleteNeighborPlace = async (req: Request, res: Response) => {
  const { id: place_id, neighbor_id: neighbor_id } = req.params;
  try {
    const neighborFound = await NeighborPlace.findOne({
      where: {
        place_id: place_id,
        neighbor_id: neighbor_id,
      },
    });
    if (!neighborFound) return res.status(404).json(["Vecino no encontrado"]);

    await neighborFound.destroy();
    res.status(204).json(["Vecino eliminado del inmueble"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al eliminar el vecino del inmueble"]);
  }
};
