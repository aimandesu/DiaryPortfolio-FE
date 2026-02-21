import { getHomeData } from "@/services/Home/home-service";
import { StateStatus } from "@/types/global-state-status";
import type { MediaResponse } from "@/types/media";
import type { QueryObject } from "@/types/query-object";
import { createContext, useContext, useState, type ReactNode } from "react";

export interface HomeState {
  home: MediaResponse[] | null;
  status: StateStatus;
  error?: string;
}

interface HomeContextType {
  state: HomeState;
  fetchHomeData: (username: string, queryObject: QueryObject) => Promise<void>;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const HomeProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<HomeState>({
    home: null,
    status: StateStatus.INITIAL,
  });

  const fetchHomeData = async (username: string, queryObject: QueryObject) => {
    setState((prev) => ({ ...prev, status: StateStatus.LOADING }));
    try {
      const response = await getHomeData(username, queryObject);
      if (response.result) {
        setState((prev) => ({
          ...prev,
          status: StateStatus.COMPLETED,
          home: response.result?.data ?? null,
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
    <HomeContext.Provider value={{ state, fetchHomeData }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHome must be used within a HomeProvider");
  }
  return context;
};
