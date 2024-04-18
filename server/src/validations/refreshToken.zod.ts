import { z } from 'zod';

const refreshToken = z
  .object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  })
  .strict();

export default refreshToken;
type refreshTokenType = z.infer<typeof refreshToken>;

export { refreshTokenType };
