import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  company: z.string().optional(),
})

export const briefSchema = z.object({
  title: z.string().min(5),
  description: z.string().optional(),
  type: z.enum(['branding', 'web_design', 'consulting', 'client-submitted']),
  dueDate: z.string().datetime().optional(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
