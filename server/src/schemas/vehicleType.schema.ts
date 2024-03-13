import { z } from "zod";

export const vehicleTypeRegisterSchema = z.object({
  vehicleType: z
    .string({
      required_error: "El nombre del tipo es requerido",
    })
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre debe tener como máximo 30 caracteres"),
});

export const vehicleTypeUpdateSchema = z.object({
  vehicleType: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre debe tener como máximo 30 caracteres")
    .optional(),
});
