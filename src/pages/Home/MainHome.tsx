import React from "react";

import {
  ProfileProvider,
  useProfile,
} from "../../store/Context/ProfileContext";
import { StateStatus } from "../../types/global-state-status";
import { useHome } from "@/store/Context/HomeContext";
import { useHomeInfinite } from "@/hooks/useInfinitePagination";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
// import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
interface Props {
  username: string;
}
const MainHome = ({ username }: Props) => {
  // const { state, fetchHomeData } = useHome();

  // const handleFetch = () => {
  //   fetchHomeData("newufser123", {
  //     pageNumber: 1,
  //     pageSize: 10,
  //     sortBy: "createdAt",
  //     isDescending: true,
  //   });
  // };

  // return (
  //   <div className="bg-blue-400 min-h-screen p-4">
  //     <p>Home Context is working!</p>

  //     <button onClick={handleFetch} className="bg-white px-4 py-2 rounded mt-2">
  //       Fetch Home Data
  //     </button>

  //     {/* Loading */}
  //     {state.status === StateStatus.LOADING && <p>Loading...</p>}

  //     {/* Completed */}
  //     {state.status === StateStatus.COMPLETED && state.home && (
  //       <div className="mt-4">
  //         <h3 className="font-bold mb-2">Media List:</h3>

  //         {state.home.length === 0 ? (
  //           <p>No media found.</p>
  //         ) : (
  //           state.home.map((media) => (
  //             <div
  //               key={media.id}
  //               className="border p-2 mb-2 bg-white rounded h-[30vh]"
  //             >
  //               <p>Title: {media.title}</p>
  //               <p>Description: {media.description}</p>
  //             </div>
  //           ))
  //         )}
  //       </div>
  //     )}

  //     {/* Error */}
  //     {state.status === StateStatus.ERROR && (
  //       <p className="text-red-600 mt-2">Error: {state.error}</p>
  //     )}
  //   </div>
  // );
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useHomeInfinite(username);

  const { ref, inView } = useInView({ threshold: 1.0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const mediaList = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="min-h-screen p-4 space-y-4">
      {mediaList.map((media) => (
        <div key={media?.id} className="border p-4 rounded shadow-sm h-[30vh]">
          {media?.photoModels &&
            media.photoModels.map((photo) => (
              <img
                key={photo.id}
                src={`${import.meta.env.VITE_API_URL}${photo.url}`}
                alt={media.title}
                className="w-full h-24 object-cover mb-2"
              />
            ))}
          <h3>{media?.title}</h3>
          <p>{media?.description}</p>
        </div>
      ))}
      {isFetchingNextPage && <p>Loading more...</p>}
      {!hasNextPage && mediaList.length > 0 && <p>You've reached the end.</p>}
      {status === "error" && <p>{(error as Error).message}</p>}
      <div ref={ref} className="h-10" />
    </div>
  );
};

export default MainHome;
