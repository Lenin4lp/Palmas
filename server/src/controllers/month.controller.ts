import { Request, Response } from "express";
import { Month } from "../models/month.model";
import { Neighbor } from "../models/neighbor.model";
import { Payment } from "../models/payment.model";
import { Place } from "../models/place.model";
import { MonthlyFee } from "../models/monthlyFee.model";
import { Sequelize } from "sequelize-typescript";

// ? Obtain all months
export const getMonths = async (req: Request, res: Response) => {
  try {
    const months = await Month.findAll({
      include: [
        { model: Payment },
        { model: MonthlyFee },
        { model: Place, include: [Neighbor] },
      ],
      order: [["month_year", "ASC"]],
    });
    res.json(months);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al obtener los meses"]);
  }
};

// ? Obtain a month
export const getMonth = async (req: Request, res: Response) => {
  const month = await Month.findByPk(req.params.id, {
    include: [
      { model: Payment },
      { model: MonthlyFee },
      { model: Place, include: [Neighbor] },
    ],
  });
  if (!month) return res.status(404).json(["Mes no encontrado"]);
  res.json({ month });
};

// ? Create a month
export const createMonth = async (req: Request, res: Response) => {
  const { month_id, month, month_year, monthlyFee_id } = req.body;
  try {
    const monthFound = await Month.findOne({
      where: { month_id: month_id },
    });
    if (monthFound) {
      return res.status(400).json(["Ya existe un mes con este id"]);
    }

    const newMonth = await Month.create({
      month_id,
      month,
      month_year,
      monthlyFee_id,
    });
    res.json(newMonth);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al crear el mes"]);
  }
};

// ? Update a month
export const updateMonth = async (req: Request, res: Response) => {
  const { monthlyFee_id } = req.body;
  const month = await Month.findByPk(req.params.id);
  if (month) {
    await month.update({ monthlyFee_id });
  } else {
    return res.status(404).json(["Mes no encontrado"]);
  }
  res.json({ month });
};

// ? Delete a month
export const deleteMonth = async (req: Request, res: Response) => {
  const month = await Month.findByPk(req.params.id);
  if (month) {
    await month.destroy();
    return res.sendStatus(204);
  } else {
    return res.status(404).json(["Mes no encontrado"]);
  }
};
