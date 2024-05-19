import { Request, Response } from "express";
import { ExtraPType } from "../models/extraPType.model";
import { ExtraPayment } from "../models/extraPayment.model";

// ? Obtain all extra payment types
export const getExtraPTypes = async (req: Request, res: Response) => {
  try {
    const extraPTypes = await ExtraPType.findAll({
      include: [
        {
          model: ExtraPayment,
        },
      ],
    });
    res.json(extraPTypes);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al obtener los tipos de pago extra"]);
  }
};

// ? Obtain an extra payment type
export const getExtraPType = async (req: Request, res: Response) => {
  const extraPType = await ExtraPType.findByPk(req.params.id);
  if (!extraPType)
    return res.status(404).json(["Tipo de pago extra no encontrado"]);
  res.json({ extraPType });
};

// ? Create an extra payment type
export const createExtraPType = async (req: Request, res: Response) => {
  const { extraPType } = req.body;
  try {
    const extraPTypeFound = await ExtraPType.findOne({
      where: {
        extraPType: extraPType,
      },
    });
    if (extraPTypeFound) {
      return res
        .status(400)
        .json(["Ya existe un tipo de pago extra con ese nombre"]);
    }
    const newExtraPType = await ExtraPType.create({
      extraPType,
    });
    res.json(newExtraPType);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al crear el tipo de pago extra"]);
  }
};

// ? Update an extra payment type
export const updateExtraPType = async (req: Request, res: Response) => {
  const { extraPType } = req.body;
  const extraPTypeFound = await ExtraPType.findByPk(req.params.id);
  if (extraPTypeFound) {
    await extraPTypeFound.update({
      extraPType,
    });
    res.json({ extraPTypeFound });
  } else {
    res.status(404).json(["Tipo de pago extra no encontrado"]);
  }
};

// ? Delete an extra payment type
export const deleteExtraPType = async (req: Request, res: Response) => {
  const extraPType = await ExtraPType.findByPk(req.params.id);
  if (extraPType) {
    await extraPType.destroy();
    return res.sendStatus(204);
  } else {
    return res.status(404).json(["Tipo de pago extra no encontrado"]);
  }
};
