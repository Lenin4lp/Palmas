import { z } from "zod";

export const monthlyFeeRegisterSchema = z.object({
  monthlyFee_value: z
    .number({
      required_error: "La alicuota es requerida",
    })
    .min(1.0, { message: "El valor de la alicuota debe ser mayor a $500.00" })
    .transform((val) => parseFloat(val.toFixed(2))),
});

export const monthlyFeeUpdateSchema = z.object({
  monthlyFee_value: z
    .number()
    .min(1.0, { message: "El valor de la alicuota debe ser mayor a $500.00" })
    .transform((val) => parseFloat(val.toFixed(2)))
    .optional(),
});
