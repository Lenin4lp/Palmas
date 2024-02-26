import { Request, Response } from "express";
import { User } from "../models/user.model";

// ? Obtain all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al obtener los usuarios"]);
  }
};

// ? Obtain a user
export const getUser = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json(["Usuario no encontrado"]);
  res.json({ user });
};

// ? Create a user
export const createUser = async (req: Request, res: Response) => {
  const { user_name, user_lastname, user_email, user_password } = req.body;
  try {
    const userFound = await User.findOne({
      where: { user_email: user_email },
    });
    if (userFound) {
      return res.status(400).json(["Ya existe un usuario con este correo"]);
    }
    const newUser = await User.create({
      user_name,
      user_lastname,
      user_email,
      user_password,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al crear el usuario"]);
  }
};

// ? Update a user
export const updateUser = async (req: Request, res: Response) => {
  const { user_name, user_lastname, user_email, user_password } = req.body;
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.update({
      user_name,
      user_lastname,
      user_email,
      user_password,
    });
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
