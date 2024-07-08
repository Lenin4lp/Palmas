import { Request, Response } from "express";
import { ExtraPPayment } from "../models/extraPPayment.model";
import { ExtraPayment } from "../models/extraPayment.model";
import { Place } from "../models/place.model";
import { PlaceType } from "../models/placeType.model";

//? Obtain all extra p payments
export const getExtraPPayments = async (req: Request, res: Response) => {
  try {
    const extraPPayments = await ExtraPPayment.findAll({
      include: [{ model: ExtraPayment }],
      order: [["extraPPayment_id", "DESC"]],
    });
    res.json(extraPPayments);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al obtener los pagos extra"]);
  }
};

//? Obtain an extra p payment
export const getExtraPPayment = async (req: Request, res: Response) => {
  const extraPPayment = await ExtraPPayment.findByPk(req.params.id, {
    include: [{ model: ExtraPayment }],
  });
  if (!extraPPayment) return res.status(404).json(["Pago extra no encontrado"]);
  res.json({ extraPPayment });
};

//? Create a p payment
export const createExtraPPayment = async (req: Request, res: Response) => {
  const {
    customer,
    deposit,
    transfer,
    value,
    cash,
    id_document,
    date,
    extraPayment_id,
  } = req.body;

  try {
    const extraPayment = await ExtraPayment.findByPk(extraPayment_id);

    if (extraPayment && extraPayment.value > 0 && value <= extraPayment.value) {
      const newExtraPPayment = await ExtraPPayment.create({
        customer,
        deposit,
        transfer,
        value,
        cash,
        id_document,
        date,
        extraPayment_id,
      });
      extraPayment.value -= Math.abs(value);
      await extraPayment.save();
      res.json(newExtraPPayment);
    } else {
      res.status(400).json(["El valor del pago no puede ser mayor a la deuda"]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al crear el pago extra"]);
  }
};

// ? Update an extra p payment
export const updateExtraPPayment = async (req: Request, res: Response) => {
  const {
    value,
    customer,
    deposit,
    transfer,
    cash,
    id_document,
    date,
    extraPayment_id,
    file,
  } = req.body;
  const extraPPayment = await ExtraPPayment.findByPk(req.params.id);
  if (extraPPayment) {
    await extraPPayment.update({
      value,
      customer,
      deposit,
      transfer,
      cash,
      id_document,
      date,
      extraPayment_id,
      file,
    });
  } else {
    return res.status(404).json(["Pago extra no encontrado"]);
  }
  res.json({ extraPPayment });
};

// ? Delete an extra p payment
export const deleteExtraPPayment = async (req: Request, res: Response) => {
  const extraPPayment = await ExtraPPayment.findByPk(req.params.id);
  if (extraPPayment) {
    await extraPPayment.destroy();
    return res.sendStatus(204);
  } else {
    return res.status(404).json(["Pago extra no encontrado"]);
  }
};
