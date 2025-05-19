import { z } from 'zod';

export const newUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name requerido"),
  lastName: z
    .string()
    .min(1, "Last name requerido"),
  email: z
    .string()
    .min(1, { message: "El correo electrónico es obligatorio." })
    .email({ message: "Debe ser un correo electrónico válido." }),
  rol: z
    .string()
    .min(1, "Rol requerido"),
  username: z
    .string()
    .min(1, "Username requerido"),
  password: z
    .string()
    .min(1, { message: "La contraseña es obligatoria." })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
    // .regex(/[a-zA-Z]/, { message: "La contraseña debe contener al menos una letra." })
    // .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
    // .regex(/[^a-zA-Z0-9]/, { message: "La contraseña debe contener al menos un carácter especial." }),
  repeatPassword: z
    .string()
    .min(1, { message: "La contraseña es obligatoria" })
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["repeatPassword"], // <-- Esto indica dónde mostrar el error
  });

// Inferir el tipo de los datos del formulario a partir del esquema
export type newUserFormInputs = z.infer<typeof newUserSchema>;