import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El correo electrónico es obligatorio." })
    .email({ message: "Debe ser un correo electrónico válido." }),
  password: z
    .string()
    .min(1, { message: "La contraseña es obligatoria." })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
    // .regex(/[a-zA-Z]/, { message: "La contraseña debe contener al menos una letra." })
    // .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
    // .regex(/[^a-zA-Z0-9]/, { message: "La contraseña debe contener al menos un carácter especial." }),
});

// Inferir el tipo de los datos del formulario a partir del esquema
export type LoginFormInputs = z.infer<typeof loginSchema>;