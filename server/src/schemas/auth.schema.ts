import { z } from "zod";

export const registerSchema = z.object({
  user_name: z
    .string({
      required_error: "El nombre es requerido",
    })
    .min(5, {
      message: "El nombre debe tener al menos 5 caracteres",
    })
    .max(50, {
      message: "El nombre debe tener como maximo 50 caracteres",
    }),
  user_lastname: z
    .string({
      required_error: "El apellido es requerido",
    })
    .min(5, {
      message: "El apellido debe tener al menos 5 caracteres",
    })
    .max(50, {
      message: "El apellido debe tener como maximo 50 caracteres",
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
  user_phone: z
    .string({
      required_error: "El teléfono es requerido",
    })
    .min(7, {
      message: "El teléfono debe tener como mínimo 7 caracteres",
    })
    .max(10, {
      message: "El teléfono debe tener como máximo 10 caracteres",
    }),
});

export const updateSchema = z.object({
  user_name: z
    .string()
    .min(5, {
      message: "El nombre debe tener al menos 5 caracteres",
    })
    .max(50, {
      message: "El nombre debe tener como maximo 50 caracteres",
    })
    .optional(),
  user_lastname: z
    .string()
    .min(5, {
      message: "El apellido debe tener al menos 5 caracteres",
    })
    .max(50, {
      message: "El apellido debe tener como maximo 50 caracteres",
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
  user_phone: z
    .string()
    .min(7, {
      message: "El teléfono debe tener como mínimo 7 caracteres",
    })
    .max(10, {
      message: "El teléfono debe tener como máximo 10 caracteres",
    })
    .optional(),
});

export const loginSchema = z.object({
  user_email: z
    .string({
      required_error: "El correo electrónico es requerido",
    })
    .email({
      message: "Correo electrónico inválido",
    }),
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
