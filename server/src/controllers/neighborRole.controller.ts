import { Request, Response } from "express";
import { NeighborRole } from "../models/neighborRole.model";

// ? Obtain all roles
export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await NeighborRole.findAll();
    res.json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al obtener los roles"]);
  }
};

// ? Obtain a role
export const getRole = async (req: Request, res: Response) => {
  const role = await NeighborRole.findByPk(req.params.id);
  if (!role) return res.status(404).json(["Rol no encontrado"]);
  res.json({ role });
};
