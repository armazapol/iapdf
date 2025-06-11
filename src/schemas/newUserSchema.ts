import { z } from 'zod';
import { useAuth } from "@/context/AuthContext";

export const UserSchema = z.object({
  name: z
    .string()
    .min(1, "Name requerido"),
  last_name: z
    .string()
    .min(1, "Last name requerido"),
  email: z
    .string()
    .min(1, { message: "El correo electrónico es obligatorio." })
    .email({ message: "Debe ser un correo electrónico válido." }),
  role: z
    .string()
    .min(1, "Rol requerido"),
  isActive: z
    .boolean(),  
  username: z
    .string()
    .min(1, "Username requerido"),
  password: z
    .string()
    .min(1, { message: "La contraseña es obligatoria." })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
  repeatPassword: z
   .string()
   .min(1, "La contraseña es obligatoria"),
    // .regex(/[a-zA-Z]/, { message: "La contraseña debe contener al menos una letra." })
    // .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
    // .regex(/[^a-zA-Z0-9]/, { message: "La contraseña debe contener al menos un carácter especial." }),
  
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["repeatPassword"],
  });

// export const autenticationSchema =  z.object({
//   password: z
//    .string()
//     .min(1, { message: "La contraseña es obligatoria." })
//     .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
//   repeatPassword: z
//   .string()
//   .min(1, "La contraseña es obligatoria"),
// })
// .refine((data) => data.password === data.repeatPassword, {
//   message: "Las contraseñas no coinciden.",
//   path: ["repeatPassword"],
// });

// export const useUserSchema = () => {
//   const { isAdmin } = useAuth();

//   return isAdmin
//     ? UserSchema.and(autenticationSchema)
//     : UserSchema;
// }; 
// Inferir el tipo de los datos del formulario a partir del esquema
export type newUserFormInputs = z.infer<typeof UserSchema>;

// export const CombinedUserSchema = UserSchema.and(autenticationSchema);
// export type newUserFormInputs = z.infer<typeof CombinedUserSchema>;