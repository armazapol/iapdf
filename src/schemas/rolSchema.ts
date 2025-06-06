import { z } from 'zod';
export const rolSchema = z.object({
  rol: z
    .string()
    .min(1, { message: "Campo requerido" }),
  isActive: z
    .boolean(),
  permissions: z.object({
    pdf_to_excel: z.boolean(),
    history: z.boolean(),
    incidents: z.boolean(),
    user_management: z.boolean(),
  }),
});


export type rolInputs = z.infer<typeof rolSchema>;