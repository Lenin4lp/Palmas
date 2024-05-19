import { Request, Response } from "express";
import { ExtraPayment } from "../models/extraPayment.model";
import { ExtraPType } from "../models/extraPType.model";
import { MonthlyDebt } from "../models/monthlyDebt.model";

// ? Obtain all extra payments
export const getExtraPayments = async (req: Request, res: Response) => {
  try {
    const extraPayments = await ExtraPayment.findAll({
      include: [
        {
          model: ExtraPType,
        },
        {
          model: MonthlyDebt,
        },
      ],
    });
    res.json(extraPayments);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al obtener los pagos extra"]);
  }
};

// ? Obtain an extra payment
export const getExtraPayment = async (req: Request, res: Response) => {
  const extraPayment = await ExtraPayment.findByPk(req.params.id, {
    include: [
      {
        model: ExtraPType,
      },
      {
        model: MonthlyDebt,
      },
    ],
  });
  if (!extraPayment) return res.status(404).json(["Pago extra no encontrado"]);
  res.json({ extraPayment });
};

// ? Create an extra Payment
export const createExtraPayment = async (req: Request, res: Response) => {
  const { extraPType_id, monthlyDebt_id, value, date, description } = req.body;
  try {
    const monthlyDebt = await MonthlyDebt.findByPk(monthlyDebt_id);

    if (monthlyDebt) {
      const newExtraPayment = await ExtraPayment.create({
        extraPType_id,
        monthlyDebt_id,
        value,
        date,
        description,
      });
      const totalDebt = Number(monthlyDebt.debt) + Number(value);
      monthlyDebt.debt = totalDebt;
      await monthlyDebt.save();
      res.json(newExtraPayment);
    } else {
      res.status(404).json(["Deuda no encontrada"]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al crear el pago extra"]);
  }
};

export const updateExtraPayment = async (req: Request, res: Response) => {
  const { extraPType_id, monthlyDebt_id, value, date, description } = req.body;
  const extraPayment = await ExtraPayment.findByPk(req.params.id);
  if (extraPayment) {
    await extraPayment.update({
      extraPType_id,
      monthlyDebt_id,
      value,
      date,
      description,
    });
    res.json({ extraPayment });
  } else {
    res.status(404).json(["Pago extra no encontrado"]);
  }
};

// ? Delete an extra payment
export const deleteExtraPayment = async (req: Request, res: Response) => {
  const extraPayment = await ExtraPayment.findByPk(req.params.id);
  if (extraPayment) {
    await extraPayment.destroy();
    return res.sendStatus(204);
  } else {
    res.status(404).json(["Pago extra no encontrado"]);
  }
};
