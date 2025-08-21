import { ZodError } from "zod";

import { apiFetch, handleZodError } from "../utils/fetch";
import {
  SignupRequest,
  SignupResponse,
  SignupRequestSchema,
  SigninRequest,
  SigninResponse,
  SigninRequestSchema,
  ChangePasswordRequest,
  ChangePasswordResponse,
  ChangePasswordRequestSchema,
  RefreshTokenRequest,
  RefreshResponse,
  RefreshTokenRequestSchema,
  ChangeRoleRequest,
  ChangeRoleResponse,
  ChangeRoleRequestSchema,
  SignoutResponse,
} from "../validations/auth-validation";

export async function signUpRest(
  data: SignupRequest
): Promise<APIResponse<SignupResponse | null>> {
  try {
    const validatedData = SignupRequestSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        status: "error",
        status_code: 400,
        message: "Validation failed",
        payload: {
          data: null,
          errors: validatedData.error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
      };
    }
    return apiFetch<SignupResponse>(
      "/auth/signup",
      "POST",
      undefined,
      validatedData.data
    );
  } catch (error) {
    console.log("🚀 ~ signUpRest ~ error:", error);
    if (error instanceof ZodError) {
      return handleZodError<SignupResponse>(error);
    }
    return {
      status: "error",
      status_code: 500,
      message: "Unexpected server error",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
}

export async function signInRest(
  data: SigninRequest,
  deviceId: string
): Promise<APIResponse<SigninResponse | null>> {
  try {
    const validatedData = SigninRequestSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        status: "error",
        status_code: 400,
        message: "Validation failed",
        payload: {
          data: null,
          errors: validatedData.error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
      };
    }
    return apiFetch<SigninResponse>(
      "/auth/signin",
      "POST",
      { "X-Device-ID": deviceId },
      validatedData.data
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<SigninResponse>(error);
    }
    return {
      status: "error",
      status_code: 500,
      message: "Unexpected server error",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
}

export async function changePasswordRest(
  data: ChangePasswordRequest,
  token: string
): Promise<APIResponse<ChangePasswordResponse | null>> {
  try {
    const validatedData = ChangePasswordRequestSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        status: "error",
        status_code: 400,
        message: "Validation failed",
        payload: {
          data: null,
          errors: validatedData.error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
      };
    }
    return apiFetch<ChangePasswordResponse>(
      "/auth/change-password",
      "POST",
      { Authorization: `Bearer ${token}` },
      validatedData.data
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<ChangePasswordResponse>(error);
    }
    return {
      status: "error",
      status_code: 500,
      message: "Unexpected server error",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
}

export async function refreshTokenRest(
  data: RefreshTokenRequest,
  deviceId: string
): Promise<APIResponse<RefreshResponse | null>> {
  try {
    const validatedData = RefreshTokenRequestSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        status: "error",
        status_code: 400,
        message: "Validation failed",
        payload: {
          data: null,
          errors: validatedData.error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
      };
    }
    return apiFetch<RefreshResponse>(
      "/auth/refresh-token",
      "POST",
      { "X-Device-ID": deviceId },
      validatedData.data
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<RefreshResponse>(error);
    }
    return {
      status: "error",
      status_code: 500,
      message: "Unexpected server error",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
}

export async function changeRoleRest(
  data: ChangeRoleRequest,
  token: string
): Promise<APIResponse<ChangeRoleResponse | null>> {
  try {
    const validatedData = ChangeRoleRequestSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        status: "error",
        status_code: 400,
        message: "Validation failed",
        payload: {
          data: null,
          errors: validatedData.error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
      };
    }
    return apiFetch<ChangeRoleResponse>(
      "/auth/change-role",
      "POST",
      { Authorization: `Bearer ${token}` },
      validatedData.data
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<ChangeRoleResponse>(error);
    }
    return {
      status: "error",
      status_code: 500,
      message: "Unexpected server error",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
}

export async function signOutRest(
  token: string
): Promise<APIResponse<SignoutResponse | null>> {
  try {
    return apiFetch<SignoutResponse>("/auth/signout", "POST", {
      Authorization: `Bearer ${token}`,
    });
  } catch (error) {
    return {
      status: "error",
      status_code: 500,
      message: "Unexpected server error",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
}
