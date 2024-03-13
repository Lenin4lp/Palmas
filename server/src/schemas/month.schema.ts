import { z } from "zod";

export const monthRegisterSchema = z.object({
  year: z
    .string({
      required_error: "El año es requerido",
    })
    .min(4, {
      message: "El año debe tener al menos 4 caracteres",
    })
    .max(4, {
      message: "El año debe tener como maximo 4 caracteres",
    }),
  month: z
    .string({
      required_error: "El mes es requerido",
    })
    .min(2, {
      message: "El mes debe tener al menos 2 caracteres",
    })
    .max(20, {
      message: "El mes debe tener como maximo 20 caracteres",
    }),
  monthlyFee_id: z.number({
    required_error: "La alicuota es requerida",
  }),
});

export const monthUpdateSchema = z.object({
  year: z
    .string()
    .min(4, {
      message: "El año debe tener al menos 4 caracteres",
    })
    .max(4, {
      message: "El año debe tener como maximo 4 caracteres",
    })
    .optional(),
  month: z
    .string()
    .min(2, {
      message: "El mes debe tener al menos 2 caracteres",
    })
    .max(2, {
      message: "El mes debe tener como maximo 2 caracteres",
    })
    .optional(),
  monthlyFee_id: z.number().optional(),
});
