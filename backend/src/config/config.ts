import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = z
  .object({
    NODE_ENV: z.enum(['production', 'development', 'test']),
    PORT: z.number().int().safe().or(z.string()).pipe(z.coerce.number()),
  })
  .partial();

const requiredEnvVarsSchema = envVarsSchema.required({ NODE_ENV: true });

type requiredEnvVarsSchema = z.infer<typeof requiredEnvVarsSchema>;

const result = requiredEnvVarsSchema.safeParse(process.env);

if (!result.success) {
  throw new Error(`Config validation error: ${result.error}`);
}

const envVars = result.data;

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT || 8080,
};
