import { createContext, useContext, useState, type ReactNode } from "react";
import type { AuthResponse } from "../../types/auth";
import { StateStatus } from "../../types/global-state-status";
import { signUpUser } from "../../services/Auth/auth-service";

export interface AuthState {
  user: AuthResponse | null;
  status: StateStatus;
  error?: string;
}

interface AuthContextType {
  state: AuthState;
  signUp: (
    email: string,
    username: string,
    password: string,
    passwordConfirm: string,
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    status: StateStatus.INITIAL,
  });

  const signUp = async (
    email: string,
    username: string,
    password: string,
    passwordConfirm: string,
  ) => {
    setState((prev) => ({ ...prev, status: StateStatus.LOADING }));

    try {
      const response = await signUpUser({
        email,
        username,
        password,
        passwordConfirm,
      });

      if (response.result) {
        setState((prev) => ({
          ...prev,
          status: StateStatus.COMPLETED,
          user: response.result,
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
    <AuthContext.Provider value={{ state, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
