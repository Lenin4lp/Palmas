import { Request, Response } from "express";
import { Payment } from "../models/payment.model";
import { Month } from "../models/month.model";
import { Place } from "../models/place.model";
import { Neighbor } from "../models/neighbor.model";
import { MonthlyDebt } from "../models/monthlyDebt.model";
import { PlaceType } from "../models/placeType.model";
import { MonthlyFee } from "../models/monthlyFee.model";

// ? Obtain all payments
export const getPayments = async (req: Request, res: Response) => {
  try {
    const payments = await Payment.findAll({
      include: [{ model: Month }, { model: Place }],
    });
    res.json(payments);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al obtener los pagos"]);
  }
};

// ? Obtain a payment
export const getPayment = async (req: Request, res: Response) => {
  const payment = await Payment.findByPk(req.params.id, {
    include: [{ model: Month }, { model: Place }],
  });
  if (!payment) return res.status(404).json(["Pago no encontrado"]);
  res.json({ payment });
};

// ? Create a payment
export const createPayment = async (req: Request, res: Response) => {
  const {
    customer,
    value,
    deposit,
    transfer,
    id_document,
    cash,
    date,
    monthlyDebt_id,
  } = req.body;

  try {
    const monthlyDebt = await MonthlyDebt.findByPk(monthlyDebt_id);

    if (monthlyDebt && monthlyDebt.debt > 0 && value <= monthlyDebt.debt) {
      const newPayment = await Payment.create({
        value,
        customer,
        deposit,
        transfer,
        cash,
        id_document,
        date,
        monthlyDebt_id,
      });
      monthlyDebt.debt -= Math.abs(value);
      await monthlyDebt.save();
      res.json(newPayment);
    } else if (monthlyDebt && monthlyDebt.debt == 0) {
      const newPayment = await Payment.create({
        value,
        customer,
        deposit,
        transfer,
        cash,
        id_document,
        date,
        monthlyDebt_id,
      });
      const place = await Place.findByPk(monthlyDebt.place_id, {
        include: [{ model: PlaceType, include: [{ model: MonthlyFee }] }],
      });
      if (place) {
        if (place.placeType.monthlyFee.monthlyFee_value >= value) {
          const earlyPay = monthlyDebt.early_payment + Math.abs(value);
          if (earlyPay <= place.placeType.monthlyFee.monthlyFee_value) {
            monthlyDebt.early_payment += Math.abs(value);
            await monthlyDebt.save();
            res.json(newPayment);
          } else {
            return res
              .status(400)
              .json(["El abono supera el valor de la mensualidad"]);
          }
        } else {
          return res
            .status(400)
            .json(["El valor del abono no puede ser mayor a la alicuota"]);
        }
      }
    } else {
      return res
        .status(400)
        .json(["El valor del pago no puede ser mayor que la deuda"]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al crear el pago"]);
  }
};

// ? Update a payment
export const updatePayment = async (req: Request, res: Response) => {
  const {
    value,
    customer,
    deposit,
    transfer,
    cash,
    id_document,
    date,
    monthlyDebt_id,
    file,
  } = req.body;
  const payment = await Payment.findByPk(req.params.id);
  if (payment) {
    await payment.update({
      value,
      customer,
      deposit,
      transfer,
      cash,
      id_document,
      date,
      monthlyDebt_id,
      file,
    });
  } else {
    return res.status(404).json(["Pago no encontrado"]);
  }
  res.json({ payment });
};

// ? Delete a payment
export const deletePayment = async (req: Request, res: Response) => {
  const payment = await Payment.findByPk(req.params.id);
  if (payment) {
    await payment.destroy();
    return res.sendStatus(204);
  } else {
    return res.status(404).json(["Pago no encontrado"]);
  }
};
