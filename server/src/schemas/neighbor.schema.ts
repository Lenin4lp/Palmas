import { z } from "zod";

export const neighborRegisterSchema = z.object({
  neighbor_name: z
    .string({
      required_error: "El nombre es requerido",
    })
    .min(5, {
      message: "El nombre debe tener al menos 5 caracteres",
    })
    .max(50, {
      message: "El nombre debe tener como maximo 50 caracteres",
    }),
  neighbor_lastname: z
    .string({
      required_error: "El apellido es requerido",
    })
    .min(5, {
      message: "El apellido debe tener al menos 5 caracteres",
    })
    .max(50, {
      message: "El apellido debe tener como maximo 50 caracteres",
    }),
  neighbor_email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "El email es invalido",
    }),
});

export const neighborUpdateSchema = z.object({
  neighbor_name: z
    .string()
    .min(5, {
      message: "El nombre debe tener al menos 5 caracteres",
    })
    .max(50, {
      message: "El nombre debe tener como maximo 50 caracteres",
    })
    .optional(),
  neighbor_lastname: z
    .string()
    .min(5, {
      message: "El apellido debe tener al menos 5 caracteres",
    })
    .max(50, {
      message: "El apellido debe tener como maximo 50 caracteres",
    })
    .optional(),
  neighbor_email: z
    .string()
    .email({
      message: "El email es invalido",
    })
    .optional(),
});
