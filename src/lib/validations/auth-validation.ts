import { z } from "zod";

export const SignupRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  full_name: z.string().min(1),
});

export type SignupRequest = z.infer<typeof SignupRequestSchema>;

export const SigninRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type SigninRequest = z.infer<typeof SigninRequestSchema>;

export const ChangePasswordRequestSchema = z.object({
  old_password: z.string().min(1),
  new_password: z.string().min(8),
});

export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>;

export const RefreshTokenRequestSchema = z.object({
  refresh_token: z.string().min(1),
});

export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;

export const ChangeRoleRequestSchema = z.object({
  role: z.enum(["super_admin", "admin", "user"]),
});

export type ChangeRoleRequest = z.infer<typeof ChangeRoleRequestSchema>;
export const UserResponseSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  status: z.enum(["active", "inactive", "banned"]), // sesuaikan dengan enum `user_status` di DB
  email_verified: z.boolean(),
  created_at: z.string().datetime(), // ISO 8601 format
  updated_at: z.string().datetime(),
  deleted_at: z.string().datetime().nullable(), // soft delete bisa null
});

// No schema for signout as it has no body

export type UserResponse = z.infer<typeof UserResponseSchema>;
export type SignupResponse = {
  id: string;
  email: string;
};

export type SigninResponse = {
  access_token: string;
  refresh_token: string;
  user: UserResponse;
};

export type RefreshResponse = {
  access_token: string;
  refresh_token: string;
};

export type ChangePasswordResponse = Record<string, never>;

export type ChangeRoleResponse = Record<string, never>;

export type SignoutResponse = Record<string, never>;
