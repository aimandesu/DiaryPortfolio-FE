import type { GlobalResponse } from "./global-response";
import type { UserResponse } from "./user";

interface SignUpRequest {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

export interface AuthResponse {
  user: UserResponse;
  jwtAccessToken: string;
  refreshToken: string;
  expiresAt: string;
}
