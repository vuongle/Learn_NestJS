import { z } from 'zod';

export const createPropertySchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Zod: Name must be between 3 and 10 characters' })
    .max(10, { message: 'Zod: Name must be between 3 and 10 characters' }),
  description: z.string(),
  area: z.number().int(),
});

export type CreatePropertyZodDto = z.infer<typeof createPropertySchema>;
