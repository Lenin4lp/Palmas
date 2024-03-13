import { z } from "zod";

export const vehicleRegisterSchema = z.object({
  plate: z
    .string({
      required_error: "La placa es requerida",
    })
    .min(6, "La placa debe tener al menos 6 caracteres")
    .max(6, "La placa debe tener como máximo 9 caracteres"),
  vehicleType_id: z.number({
    required_error: "El tipo de vehículo es requerido",
  }),
  place_id: z.number({
    required_error: "El inmueble es requerido",
  }),
});

export const vehicleUpdateSchema = z.object({
  plate: z
    .string()
    .min(6, "La placa debe tener al menos 6 caracteres")
    .max(6, "La placa debe tener como máximo 9 caracteres")
    .optional(),
  vehicleType_id: z.number().optional(),
  place_id: z.number().optional(),
});
