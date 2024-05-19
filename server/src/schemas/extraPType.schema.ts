import { z } from "zod";

export const extraPTypeRegisterSchema = z.object({
  extraPType: z
    .string({
      required_error: "El nombre del tipo es requerido",
    })
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(20, "El nombre debe tener como máximo 20 caracteres"),
});

export const extraPTypeUpdateSchema = z.object({
  extraPType: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre debe tener como máximo 30 caracteres")
    .optional(),
});
