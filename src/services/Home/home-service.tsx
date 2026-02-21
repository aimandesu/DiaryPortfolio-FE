import type { PaginationResponse } from "@/types/pagination-response";
import type { GlobalResponse } from "@/types/global-response";
import type { MediaResponse } from "@/types/media";
import type { QueryObject } from "@/types/query-object";

export const getHomeData = async (
  username: string,
  queryObject: QueryObject,
): Promise<GlobalResponse<PaginationResponse<MediaResponse>>> => {
  const rest = await fetch(
    `${import.meta.env.VITE_API_URL}/api/media/getAll?username=${encodeURIComponent(username)}&PageNumber=${queryObject.pageNumber ?? 1}&PageSize=${queryObject.pageSize ?? 10}&SortBy=${queryObject.sortBy ?? "createdAt"}&IsDescending=${queryObject.isDescending ?? true}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return rest.json();
};
