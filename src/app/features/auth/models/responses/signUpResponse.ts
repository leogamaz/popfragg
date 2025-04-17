import { z } from 'zod';
import { userResponseSchema } from './userResponse';

export const signUpResponseSchema = z.object({
  message: z.string().optional(),
  access_Token: z.string().optional(),
  expires_In: z.number(),
  user: userResponseSchema,
});

export type SignUpResponse = z.infer<typeof signUpResponseSchema>;
