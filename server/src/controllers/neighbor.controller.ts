import { Request, Response } from "express";
import { Neighbor } from "../models/neighbor.model";
import { Place } from "../models/place.model";
import { Payment } from "../models/payment.model";
import { Month } from "../models/month.model";

// ? Obtain all neighbors
export const getNeighbors = async (req: Request, res: Response) => {
  try {
    const neighbors = await Neighbor.findAll({
      include: [
        { model: Place, include: [{ model: Payment, include: [Month] }] },
      ],
    });
    res.json(neighbors);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al obtener los vecinos"]);
  }
};

// ? Obtain a neighbor
export const getNeighbor = async (req: Request, res: Response) => {
  const neighbor = await Neighbor.findByPk(req.params.id, {
    include: [
      { model: Place, include: [{ model: Payment, include: [Month] }] },
    ],
  });
  if (!neighbor) return res.status(404).json(["Vecino no encontrado"]);
  res.json({ neighbor });
};

// ? Create a neighbor
export const createNeighbor = async (req: Request, res: Response) => {
  const { neighbor_name, neighbor_lastname, neighbor_email, neighbor_phone } =
    req.body;
  try {
    const neighborFound = await Neighbor.findOne({
      where: {
        neighbor_email: neighbor_email,
        neighbor_name: neighbor_name,
        neighbor_lastname: neighbor_lastname,
      },
    });
    if (neighborFound) {
      return res.status(400).json(["Ya existe un vecino con esos datos"]);
    }
    const newNeighbor = await Neighbor.create({
      neighbor_name,
      neighbor_lastname,
      neighbor_email,
      neighbor_phone,
    });
    res.json(newNeighbor);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al crear el vecino"]);
  }
};

// ? Update a neighbor
export const updateNeighbor = async (req: Request, res: Response) => {
  const { neighbor_name, neighbor_lastname, neighbor_email, neighbor_phone } =
    req.body;
  const neighbor = await Neighbor.findByPk(req.params.id);
  if (neighbor) {
    await neighbor.update({
      neighbor_name,
      neighbor_lastname,
      neighbor_email,
      neighbor_phone,
    });
  } else {
    return res.status(404).json(["Vecino no encontrado"]);
  }
  res.json({ neighbor });
};

// ? Delete a neighbor
export const deleteNeighbor = async (req: Request, res: Response) => {
  const neighbor = await Neighbor.findByPk(req.params.id);
  if (neighbor) {
    await neighbor.destroy();
    return res.sendStatus(204);
  } else {
    return res.status(404).json(["Vecino no encontrado"]);
  }
};
