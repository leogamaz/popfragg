import { z } from 'zod';
import { appDataSchema } from './appDataRequest';

export const signInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type SignInRequest = z.infer<typeof signInSchema>;
