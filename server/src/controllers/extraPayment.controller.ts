import { Request, Response } from "express";
import { ExtraPayment } from "../models/extraPayment.model";
import { ExtraPType } from "../models/extraPType.model";
import { Place } from "../models/place.model";
import { Neighbor } from "../models/neighbor.model";
import { ExtraPPayment } from "../models/extraPPayment.model";

// ? Obtain all extra payments
export const getExtraPayments = async (req: Request, res: Response) => {
  try {
    const extraPayments = await ExtraPayment.findAll({
      include: [
        {
          model: ExtraPType,
        },
        {
          model: Place,
        },
        {
          model: ExtraPPayment,
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
        model: Place,
        include: [{ model: Neighbor }],
      },
    ],
  });
  if (!extraPayment) return res.status(404).json(["Pago extra no encontrado"]);
  res.json({ extraPayment });
};

// ? Create an extra Payment
export const createExtraPayment = async (req: Request, res: Response) => {
  const { extraPType_id, place_id, value, date, description, status } =
    req.body;
  try {
    const monthlyDebt = await Place.findByPk(place_id);

    if (monthlyDebt) {
      const newExtraPayment = await ExtraPayment.create({
        extraPType_id,
        place_id,
        value,
        date,
        description,
        status: status ?? true,
      });

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
  const { extraPType_id, place_id, value, date, description } = req.body;
  const extraPayment = await ExtraPayment.findByPk(req.params.id);
  if (extraPayment) {
    await extraPayment.update({
      extraPType_id,
      place_id,
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
