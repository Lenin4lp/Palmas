import { Request, Response } from "express";
import { MonthlyFee } from "../models/monthlyFee.model";
import { Month } from "../models/month.model";
import { Payment } from "../models/payment.model";
import { Place } from "../models/place.model";
import { Neighbor } from "../models/neighbor.model";

// ? Obtain all monthly fees
export const getMonthlyFees = async (req: Request, res: Response) => {
  try {
    const monthlyFees = await MonthlyFee.findAll({
      include: [
        {
          model: Month,
        },
      ],
    });
    res.json(monthlyFees);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al obtener las alicuotas"]);
  }
};

// ? Obtain a monthly fee
export const getMonthlyFee = async (req: Request, res: Response) => {
  const monthlyFee = await MonthlyFee.findByPk(req.params.id);
  if (!monthlyFee) return res.status(404).json(["Alicuota no encontrada"]);
  res.json({ monthlyFee });
};

// ? Create a monthly fee
export const createMonthlyFee = async (req: Request, res: Response) => {
  const { monthlyFee_value } = req.body;
  try {
    const monthlyFeeFound = await MonthlyFee.findOne({
      where: { monthlyFee_value: monthlyFee_value },
    });
    if (monthlyFeeFound) {
      return res.status(500).json(["Ya existe una alicuota con este monto"]);
    }
    const newMonth = await MonthlyFee.create({
      monthlyFee_value,
    });
    res.json(newMonth);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al crear la alicuota"]);
  }
};

// ? Update a monthly fee
export const updateMonthlyFee = async (req: Request, res: Response) => {
  const { monthlyFee_value } = req.body;
  const monthlyFee = await MonthlyFee.findByPk(req.params.id);
  if (monthlyFee) {
    await monthlyFee.update({
      monthlyFee_value,
    });
  } else {
    return res.status(404).json(["Alicuota no encontrada"]);
  }
  res.json({ monthlyFee });
};

// ? Delete a monthly fee
export const deleteMonthlyFee = async (req: Request, res: Response) => {
  const monthlyFee = await MonthlyFee.findByPk(req.params.id);
  if (monthlyFee) {
    await monthlyFee.destroy();
    return res.sendStatus(204);
  } else {
    return res.status(404).json(["Alicuota no encontrada"]);
  }
};
