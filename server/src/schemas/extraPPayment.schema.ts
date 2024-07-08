import { z } from "zod";

export const extraPPaymentRegisterSchema = z.object({
  value: z.number({ required_error: "Monto requerido" }),
  customer: z.string({
    required_error: "Cliente requerido",
  }),
  deposit: z.string().optional(),
  transfer: z.string().optional(),
  cash: z.number().optional(),
  id_document: z
    .string({
      required_error: "El documento de identidad es requerido",
    })
    .min(8, {
      message: "La cédula debe tener como mínimo 10 caracteres",
    })
    .max(14, {
      message: "La cédula debe tener como máximo 14 caracteres",
    }),
  date: z
    .string({
      required_error: "Fecha requerida",
    })
    .refine((value) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(value);
    }, "Fecha inválida"),
});

export const ExtraPPaymentUpdateSchema = z.object({
  value: z.number().optional(),
  customer: z.string().optional(),
  deposit: z.string().optional(),
  transfer: z.string().optional(),
  cash: z.number().optional(),
  id_document: z
    .string()
    .min(8, {
      message: "La cédula debe tener como mínimo 10 caracteres",
    })
    .max(14, {
      message: "La cédula debe tener como máximo 14 caracteres",
    })
    .optional(),
  date: z
    .string()
    .refine((value) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(value);
    }, "Fecha inválida")
    .optional(),
  file: z.string().optional(),
});
