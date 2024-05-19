import { z } from "zod";

export const placeTypeRegisterSchema = z.object({
  placetype_name: z
    .string({
      required_error: "El nombre es requerido",
    })
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(20, "El nombre debe tener como máximo 20 caracteres"),
  monthly_fee: z.number().optional(),
});

export const placeTypeUpdateSchema = z.object({
  monthly_fee: z.number().optional(),
});
