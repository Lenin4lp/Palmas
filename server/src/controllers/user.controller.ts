import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Role } from "../models/userRole.model";
import bcrypt from "bcryptjs";

// ? Obtain all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      include: [{ model: Role }],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al obtener los usuarios"]);
  }
};

// ? Obtain a user
export const getUser = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id, {
    include: [{ model: Role }],
  });
  if (!user) return res.status(404).json(["Usuario no encontrado"]);
  res.json({ user });
};

// ? Create a user
export const createUser = async (req: Request, res: Response) => {
  const { user_name, user_password } = req.body;
  try {
    const userFound = await User.findOne({
      where: { user_name: user_name },
    });
    if (userFound) {
      return res.status(400).json(["Ya existe un usuario con este correo"]);
    }
    const newUser = await User.create({
      user_name,

      user_password,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al crear el usuario"]);
  }
};

// ? Update a user
export const updateUser = async (req: Request, res: Response) => {
  const { user_name, user_password, status } = req.body;
  const user = await User.findByPk(req.params.id);
  if (user) {
    if (user_password) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(user_password, salt);
      await user.update({
        user_name,
        user_password: passwordHash,
        status,
      });
    } else {
      await user.update({
        user_name,
        status,
      });
    }
  } else {
    return res.status(404).json(["Usuario no encontrado"]);
  }
  res.json({ user });
};

// ? Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    return res.status(204).json(["Usuario eliminado"]);
  } else {
    return res.status(404).json(["Usuario no encontrado"]);
  }
};
