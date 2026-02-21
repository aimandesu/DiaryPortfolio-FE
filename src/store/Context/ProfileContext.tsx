import { createContext, useContext, useState, type ReactNode } from "react";
import { StateStatus } from "../../types/global-state-status";
import type { UserResponse } from "../../types/user";
import { SearchProfile } from "../../services/Profile/profile-service";

export interface ProfileState {
  profile: UserResponse | null;
  status: StateStatus;
  error?: string;
}

interface ProfileContextType {
  state: ProfileState;
  searchProfile: (username: string) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ProfileState>({
    profile: null,
    status: StateStatus.INITIAL,
  });

  const searchProfile = async (username: string) => {
    setState((prev) => ({ ...prev, status: StateStatus.LOADING }));

    try {
      const response = await SearchProfile(username);

      if (response.result) {
        setState((prev) => ({
          ...prev,
          status: StateStatus.COMPLETED,
          profile: response.result,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          status: StateStatus.ERROR,
          error: response.error?.description,
        }));
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "An error occurred",
        status: StateStatus.ERROR,
      }));
    }
  };

  return (
    <ProfileContext.Provider value={{ state, searchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
};
