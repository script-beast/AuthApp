import { z } from 'zod';

import resAdmin from './resAdmin.zod';

const logAdmin = resAdmin.pick({ email: true, password: true });

export default logAdmin;
type logAdminType = z.infer<typeof logAdmin>;
export type { logAdminType };
