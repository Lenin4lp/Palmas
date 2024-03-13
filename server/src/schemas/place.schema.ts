import { z } from "zod";

export const placeRegisterSchema = z.object({
  place_name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .optional(),
  pending_value: z
    .number()
    .min(0, "El valor pendiente debe ser mayor o igual a 0")
    .optional(),
  placeType_id: z.number({
    required_error: "El tipo de lugar es requerido",
  }),
});

export const placeUpdateSchema = z.object({
  place_name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .optional(),
  pending_value: z
    .number()
    .min(0, "El valor pendiente debe ser mayor o igual a 0")
    .optional(),
  placeType_id: z.number().optional(),
});
