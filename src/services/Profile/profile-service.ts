import type { GlobalResponse } from "../../types/global-response";
import type { UserResponse } from "../../types/user";

export const SearchProfile = async (
  username: string,
): Promise<GlobalResponse<UserResponse>> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/getUser?username=${encodeURIComponent(username)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return res.json();
};
