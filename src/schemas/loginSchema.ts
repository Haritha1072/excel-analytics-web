import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.string().email().min(1, "Email is required"),
    password: z.string().min(5, "Password is required"),
  })
  .strict();
export type LoginModel = z.infer<typeof loginSchema>;
