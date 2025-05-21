import { z } from 'zod';

export const rolSchema = z.object({
  rol: z
    .string()
    .min(1, { message: "Campo requerido" })
});


export type rolInputs = z.infer<typeof rolSchema>;