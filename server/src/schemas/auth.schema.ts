import { z } from "zod";

export const registerSchema = z.object({
  user_name: z
    .string({
      required_error: "El nombre es requerido",
    })
    .min(4, {
      message: "El nombre debe tener al menos 4 caracteres",
    })
    .max(50, {
      message: "El nombre debe tener como maximo 50 caracteres",
    }),

  user_email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "El email es invalido",
    }),
  user_password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(5, {
      message: "La contraseña debe tener al menos 5 caracteres",
    })
    .max(50, {
      message: "La contraseña debe tener como maximo 50 caracteres",
    }),
});

export const updateSchema = z.object({
  user_name: z
    .string()
    .min(4, {
      message: "El nombre debe tener al menos 4 caracteres",
    })
    .max(50, {
      message: "El nombre debe tener como maximo 50 caracteres",
    })
    .optional(),

  user_email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "El email es invalido",
    })
    .optional(),
  user_password: z
    .string()
    .min(5, {
      message: "La contraseña debe tener al menos 5 caracteres",
    })
    .max(50, {
      message: "La contraseña debe tener como maximo 50 caracteres",
    })
    .optional(),
});

export const loginSchema = z.object({
  user_name: z
    .string()
    .min(4, {
      message: "El nombre debe tener al menos 4 caracteres",
    })
    .max(50, {
      message: "El nombre debe tener como máximo 50 caracteres",
    })
    .optional(),
  user_password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener como mínimo 6 caracteres",
    })
    .max(50, {
      message: "La contraseña debe tener como maximo 50 caracteres",
    }),
});
