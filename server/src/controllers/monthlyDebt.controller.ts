import { Request, Response } from "express";
import { MonthlyDebt } from "../models/monthlyDebt.model";
import { connection } from "../connection/connection";
import { Place } from "../models/place.model";
import { Month } from "../models/month.model";
import { Payment } from "../models/payment.model";

// ? Obtain all monthlyDebts
export const getMonthlyDebts = async (req: Request, res: Response) => {
  try {
    const monthlyDebts = await MonthlyDebt.findAll({
      include: [
        {
          model: Payment,
        },
      ],
    });
    res.json(monthlyDebts);
  } catch (error) {
    res.status(500).json(["Error al obtener las deudas mensuales"]);
    console.log(error);
  }
};

// ? Obtain a monthlyDebt
export const getMonthlyDebt = async (req: Request, res: Response) => {
  const monthlyDebt = await MonthlyDebt.findByPk(req.params.id, {
    include: [
      {
        model: Place,
      },
      {
        model: Month,
      },
    ],
  });
  if (!monthlyDebt)
    return res.status(404).json(["Deuda mensual no encontrada"]);
  res.json({ monthlyDebt });
};
