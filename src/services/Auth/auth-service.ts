import type { AuthResponse, SignUpRequest } from "../../types/auth";
import type { GlobalResponse } from "../../types/global-response";

export const signUpUser = async (
  data: SignUpRequest,
): Promise<GlobalResponse<AuthResponse>> => {
  const res = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
