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
    .string()
    .email({
      message: "El email es invalido",
    })
    .optional(),

  neighbor_phone: z
    .string()
    .regex(/^\d+$/, {
      message: "El número de teléfono debe contener solo dígitos",
    })
    .min(7, {
      message: "El teléfono debe tener como mínimo 7 caracteres",
    })
    .max(10, {
      message: "El teléfono debe tener como máximo 10 caracteres",
    })
    .optional(),
  identity_document: z
    .string({
      required_error: "El documento de identidad es requerido",
    })
    .min(8, {
      message: "La cédula debe tener como mínimo 10 caracteres",
    })
    .max(11, {
      message: "La cédula debe tener como máximo 11 caracteres",
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
