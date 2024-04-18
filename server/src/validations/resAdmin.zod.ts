import { z } from 'zod';

// name, email, password

export const resAdmin = z
  .object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(3, { message: 'Name is too short' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password is too short' })
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
        message:
          'Password should contain atleast one uppercase, one lowercase, one number and one special character',
      }),
  })
  .strict();

export default resAdmin;
type resAdminType = z.infer<typeof resAdmin>;
export type { resAdminType };
