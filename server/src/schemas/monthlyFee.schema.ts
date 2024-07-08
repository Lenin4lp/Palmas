import { z } from "zod";

export const monthlyFeeRegisterSchema = z.object({
  monthlyFee_value: z
    .number({
      required_error: "La alicuota es requerida",
    })
    .min(1.0, { message: "El valor de la alicuota debe ser mayor a $500.00" })
    .transform((val) => parseFloat(val.toFixed(2))),
  monthlyFee_name: z
    .string({ required_error: "El concepto es requerido" })
    .min(3, {
      message: "El concepto debe tener al menos 3 caracteres",
    })
    .max(20, {
      message: "El concepto debe tener como maximo 20 caracteres",
    }),
});

export const monthlyFeeUpdateSchema = z.object({
  monthlyFee_value: z
    .number()
    .min(1.0, { message: "El valor de la alicuota debe ser mayor a $500.00" })
    .transform((val) => parseFloat(val.toFixed(2)))
    .optional(),
});
