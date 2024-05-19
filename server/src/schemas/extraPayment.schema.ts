import { z } from "zod";

export const extraPaymentRegisterSchema = z.object({
  value: z.number({ required_error: "Monto requerido" }),
  date: z
    .string()
    .refine((value) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(value);
    }, "Fecha inválida")
    .optional(),
  description: z
    .string({
      required_error: "La descripción es requerida",
    })
    .min(5, {
      message: "La descripción debe tener como mínimo 5 caracteres",
    })
    .max(255, {
      message: "La descripción debe tener como máximo 255 caracteres",
    }),
});

export const extraPaymentUpdateSchema = z.object({
  value: z.number().optional(),
  date: z
    .string()
    .refine((value) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(value);
    }, "Fecha inválida")
    .optional(),
  description: z
    .string()
    .min(5, {
      message: "La descripción debe tener como mínimo 5 caracteres",
    })
    .max(255, {
      message: "La descripción debe tener como máximo 255 caracteres",
    })
    .optional(),
});
