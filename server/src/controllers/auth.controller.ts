import { Request, Response } from "express";
import { User } from "../models/user.model";
import { TOKEN_SECRET } from "../config/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt";
import { Role } from "../models/userRole.model";

//? User Register
export const userRegister = async (req: Request, res: Response) => {
  const { user_name, user_password, role_id } = req.body;
  try {
    const userFound = await User.findOne({
      where: { user_name: user_name },
    });
    if (userFound)
      return res
        .status(400)
        .json(["Ya existe un usuario con esas credenciales"]);
    const passwordHash = await bcrypt.hash(user_password, 10);

    const newUser = await User.create({
      user_name,
      user_password: passwordHash,
      role_id,
    });

    res.json({
      message: "Usuario registrado con exito",
      user_id: newUser.user_id,
      user_name: newUser.user_name,
      role_id: newUser.role_id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al registrar el usuario"]);
  }
};

// ? User Login

export const login = async (req: Request, res: Response) => {
  const { user_name, user_password } = req.body;
  try {
    const userFound = await User.findOne({
      where: {
        user_name: user_name,
      },
      include: [{ model: Role }],
    });
    if (!userFound) return res.status(400).json(["El usuario no existe"]);

    const isMatch = await bcrypt.compare(
      user_password,
      userFound.user_password
    );
    if (!isMatch) return res.status(400).json(["Contraseña incorrecta"]);

    if (userFound.status == false) {
      return res.status(400).json(["El usuario se encuentra bloqueado"]);
    }

    const token = await createAccesToken({
      id: userFound.user_id,
    });

    res.cookie("token", token);

    res.json({
      message: "Ingreso Exitoso",
      user_id: userFound.user_id,
      user_name: userFound.user_name,
      role_id: userFound.role_id,
      role: userFound.role,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(["Ha ocurrido un error con el servidor"]);
  }
};

// ? Logout
export const logout = (req: Request, res: Response) => {
  if (!req.cookies.token) return res.status(401).json({ message: "No token" });
  res.cookie("token", "", {
    expires: new Date(0),
  });
  res.redirect("/");
  return res.sendStatus(200);
};

// ? Verificar Token
export const verifyToken = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (error: any, user: any) => {
    if (error) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findByPk(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });
    return res.json({
      user_id: userFound.user_id,
      user_name: userFound.user_name,
      role_id: userFound.role_id,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  });
};
