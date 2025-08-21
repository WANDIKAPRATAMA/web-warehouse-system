import { AuthRepository } from "../interfaces/auth-interface";
import {
  signUpRest,
  signInRest,
  changePasswordRest,
  refreshTokenRest,
  changeRoleRest,
  signOutRest,
} from "../services/auth-service";
import {
  SignupRequest,
  SignupResponse,
  SigninRequest,
  SigninResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  RefreshTokenRequest,
  RefreshResponse,
  ChangeRoleRequest,
  ChangeRoleResponse,
  SignoutResponse,
} from "../validations/auth-validation";

export class RestAuthRepository implements AuthRepository {
  async signOut(token: string): Promise<APIResponse<SignoutResponse | null>> {
    if (!token) {
      return {
        status: "error",
        status_code: 401,
        message: "Unauthorized",
        payload: {
          data: null,
          errors: [],
        },
      };
    }
    return signOutRest(token);
  }
  async signUp(
    data: SignupRequest
  ): Promise<APIResponse<SignupResponse | null>> {
    return signUpRest(data);
  }

  async signIn(
    data: SigninRequest,
    deviceId: string
  ): Promise<APIResponse<SigninResponse | null>> {
    return signInRest(data, deviceId);
  }

  async changePassword(
    data: ChangePasswordRequest,
    token: string
  ): Promise<APIResponse<ChangePasswordResponse | null>> {
    if (!token) {
      return {
        status: "error",
        status_code: 401,
        message: "Unauthorized",
        payload: {
          data: null,
          errors: [],
        },
      };
    }
    return changePasswordRest(data, token);
  }

  async refreshToken(
    data: RefreshTokenRequest,
    deviceId: string
  ): Promise<APIResponse<RefreshResponse | null>> {
    return refreshTokenRest(data, deviceId);
  }

  async changeRole(
    data: ChangeRoleRequest,
    token: string
  ): Promise<APIResponse<ChangeRoleResponse | null>> {
    if (!token) {
      return {
        status: "error",
        status_code: 401,
        message: "Unauthorized",
        payload: {
          data: null,
          errors: [],
        },
      };
    }
    return changeRoleRest(data, token);
  }
}

export function newAuthRepository(): AuthRepository {
  //   if (process.env.MODE === "supabase") return new SupabaseAuthRepository();
  return new RestAuthRepository();
}
