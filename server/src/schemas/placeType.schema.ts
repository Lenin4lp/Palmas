import { z } from "zod";

export const placeTypeRegisterSchema = z.object({
  placetype_name: z
    .string({
      required_error: "El nombre es requerido",
    })
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(20, "El nombre debe tener como máximo 20 caracteres"),
  monthly_fee: z.number({
    required_error: "La alicuota inicial es requerida",
  }),
});

export const placeTypeUpdateSchema = z.object({
  placetype_name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(20, "El nombre debe tener como máximo 20 caracteres")
    .optional(),
  monthly_fee: z.number().optional(),
});
