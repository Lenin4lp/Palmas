import { z } from "zod";

export const yearRegisterSchema = z.object({
  year: z
    .string({
      required_error: "Ingresa el año",
    })
    .min(3, "El año debe tener al menos 4 caracteres")
    .max(4, "El año debe tener como maximo 4 caracteres"),
});
