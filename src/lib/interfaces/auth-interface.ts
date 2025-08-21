import {
  SigninRequest,
  SigninResponse,
  SignupRequest,
  SignupResponse,
  SignoutResponse,
  RefreshTokenRequest,
  RefreshResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  ChangeRoleRequest,
  ChangeRoleResponse,
} from "../validations/auth-validation";

export interface AuthRepository {
  signOut: (token: string) => Promise<APIResponse<SignoutResponse | null>>;

  signIn: (
    data: SigninRequest,
    deviceId: string
  ) => Promise<APIResponse<SigninResponse | null>>;
  signUp: (data: SignupRequest) => Promise<APIResponse<SignupResponse | null>>;
  refreshToken: (
    data: RefreshTokenRequest,
    deviceId: string
  ) => Promise<APIResponse<RefreshResponse | null>>;
  changePassword: (
    data: ChangePasswordRequest,
    token: string
  ) => Promise<APIResponse<ChangePasswordResponse | null>>;
  changeRole: (
    data: ChangeRoleRequest,
    token: string
  ) => Promise<APIResponse<ChangeRoleResponse | null>>;
}
