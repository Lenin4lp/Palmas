import { z } from "zod";

export const paymentRegisterSchema = z.object({
  payment_amount: z.number({ required_error: "Monto requerido" }),
  client: z.string({
    required_error: "Cliente requerido",
  }),
  deposit: z.number().optional(),
  cash: z.number().optional(),
  date: z.string().refine((value) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(value);
  }, "Fecha inválida"),
  month_id: z.string({
    required_error: "Mes requerido",
  }),
  place_id: z.string({
    required_error: "Inmueble requerido",
  }),
});

export const paymentUpdateSchema = z.object({
  payment_amount: z.number().optional(),
  deposit: z.number().optional(),
  cash: z.number().optional(),
  date: z
    .string()
    .refine((value) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(value);
    }, "Fecha inválida")
    .optional(),
  month_id: z.string().optional(),
  place_id: z.string().optional(),
});
