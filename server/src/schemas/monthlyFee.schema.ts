import { z } from "zod";

export const monthlyFeeRegisterSchema = z.object({
  monthlyFee_value: z.number({
    required_error: "La alicuota es requerida",
  }),
});

export const monthlyFeeUpdateSchema = z.object({
  monthlyFee_value: z.number().optional(),
});
