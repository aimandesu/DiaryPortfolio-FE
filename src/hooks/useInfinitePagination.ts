import { useInfiniteQuery } from "@tanstack/react-query";
import { getHomeData } from "@/services/Home/home-service";
import type {
  PaginationResponse,
  UseInfinitePaginationOptions,
} from "@/types/pagination-response";
import type { GlobalResponse } from "@/types/global-response";
import type { MediaResponse } from "@/types/media";

// export const useHomeInfinite = (username: string) => {
//   return useInfiniteQuery({
//     queryKey: ["home", username],

//     queryFn: async ({ pageParam = 1 }) => {
//       const response = await getHomeData(username, {
//         pageNumber: pageParam,
//         pageSize: 3,
//         sortBy: "createdAt",
//         isDescending: true,
//       });

//       if (!response.result) {
//         throw new Error(response.error?.description ?? "Error");
//       }

//       return response.result;
//     },

//     getNextPageParam: (lastPage) => {
//       if (lastPage.currentPage < lastPage.lastPage) {
//         return lastPage.currentPage + 1;
//       }
//       return undefined;
//     },

//     initialPageParam: 1,
//   });
// };

export const useInfinitePagination = <TData>({
  queryKey,
  fetcher,
  pageSize = 10,
  sortBy = "createdAt",
  isDescending = true,
}: UseInfinitePaginationOptions<TData>) => {
  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetcher({
        pageNumber: pageParam,
        pageSize,
        sortBy,
        isDescending,
      });

      if (!response.result) {
        throw new Error(response.error?.description ?? "Error fetching data");
      }

      return response.result;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.lastPage) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

export const useHomeInfinite = (username: string) => {
  return useInfinitePagination<MediaResponse>({
    queryKey: ["home", username],
    fetcher: (params) => getHomeData(username, params),
    pageSize: 1,
  });
};
