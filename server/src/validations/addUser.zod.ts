import { z } from 'zod';

const addUser = z
  .object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email' }),
    LName: z
      .string({ required_error: 'Last name is required' })
      .min(3, { message: 'Last name is too short' })
      .transform((data) => data.trim()),
    FName: z
      .string({ required_error: 'First name is required' })
      .min(3, { message: 'First name is too short' })
      .transform((data) => data.trim()),
  })
  .strict();

export default addUser;
type addUserType = z.infer<typeof addUser>;
export type { addUserType };
