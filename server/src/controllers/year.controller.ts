import { Request, Response } from "express";
import { Year } from "../models/year.model";
import { Month } from "../models/month.model";
import { MonthlyFee } from "../models/monthlyFee.model";
import { Place } from "../models/place.model";
import { MonthlyDebt } from "../models/monthlyDebt.model";
import { Neighbor } from "../models/neighbor.model";
import { Sequelize } from "sequelize-typescript";

// ? Obtain all years
export const getYears = async (req: Request, res: Response) => {
  try {
    const years = await Year.findAll({
      include: [
        {
          model: Month,
          include: [{ model: Place }],
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

    if (newYear) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      for (const month of months) {
        const newMonth = await Month.create({
          month,
          month_year: newYear.year,
        });
        const places = await Place.findAll();
        for (const place of places) {
          await MonthlyDebt.create({
            debt: 0,
            month_id: newMonth.month_id,
            place_id: place.place_id,
          });
        }
      }
      res.json(newYear);
    } else {
      res.status(400).json(["No hay alicuotas creadas"]);
    }
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
