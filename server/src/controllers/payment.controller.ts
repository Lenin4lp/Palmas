import { Request, Response } from "express";
import { Payment } from "../models/payment.model";
import { Month } from "../models/month.model";
import { Place } from "../models/place.model";
import { Neighbor } from "../models/neighbor.model";

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
    payment_id,
    payment_amount,
    deposit,
    cash,
    date,
    month_id,
    place_id,
  } = req.body;
  try {
    const paymentFound = await Payment.findOne({
      where: {
        payment_id: payment_id,
      },
    });
    if (paymentFound) {
      return res.status(400).json(["Ya existe un pago con este id"]);
    }
    const newPayment = await Payment.create({
      payment_amount,
      deposit,
      cash,
      date,
      month_id,
      place_id,
    });
    res.json(newPayment);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error al crear el pago"]);
  }
};

// ? Update a payment
export const updatePayment = async (req: Request, res: Response) => {
  const { payment_amount, deposit, cash, date, month_id, place_id } = req.body;
  const payment = await Payment.findByPk(req.params.id);
  if (payment) {
    await payment.update({
      payment_amount,
      deposit,
      cash,
      date,
      month_id,
      place_id,
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
