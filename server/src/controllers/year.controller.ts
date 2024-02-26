import { Request, Response } from "express";
import { Year } from "../models/year.model";
import { Month } from "../models/month.model";

// ? Obtain all years
export const getYears = async (req: Request, res: Response) => {
  try {
    const years = await Year.findAll({
      include: [
        {
          model: Month,
        },
      ],
    });
    res.json(years);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al obtener los años"]);
  }
};

// ? Obtain a year
export const getYear = async (req: Request, res: Response) => {
  const year = await Year.findByPk(req.params.id, {
    include: [
      {
        model: Month,
      },
    ],
  });
  if (!year) return res.status(404).json(["Año no encontrado"]);
  res.json({ year });
};

// ? Create a year
export const createYear = async (req: Request, res: Response) => {
  const { year } = req.body;
  try {
    const yearFound = await Year.findOne({
      where: { year: year },
    });
    if (yearFound) {
      return res.status(400).json(["Ya existe un año con este id"]);
    }
    const newYear = await Year.create({
      year,
    });
    res.json(newYear);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al crear el año"]);
  }
};

// ? Delete a year
export const deleteYear = async (req: Request, res: Response) => {
  const year = await Year.findByPk(req.params.id);
  if (year) {
    await year.destroy();
    return res.sendStatus(204);
  } else {
    return res.status(404).json(["Año no encontrado"]);
  }
};
