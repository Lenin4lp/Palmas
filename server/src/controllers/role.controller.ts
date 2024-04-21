import { Request, Response } from "express";
import { Role } from "../models/userRole.model";
import { User } from "../models/user.model";

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.findAll({
      include: [{ model: User }],
      order: [["role_id", "ASC"]],
    });
    res.json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al obtener los roles"]);
  }
};

export const getRole = async (req: Request, res: Response) => {
  const role = await Role.findByPk(req.params.id, {
    include: [{ model: User }],
  });
  if (!role) return res.status(404).json(["Rol no encontrado"]);
  res.json({ role });
};
