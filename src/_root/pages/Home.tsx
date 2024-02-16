import Loader from "@/components/shared/Loader";
import { useGetRecentPosts } from "C:/Users/isaac/Desktop/Snappy/src/srclib/react-query/queriesAndMutations.ts";

const Home = () => {

  const { data: posts, isPending: isPostLoading, isError: isErrorPosts} = useGetRecentPosts()

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">
            Home Feed</h2>
            {isPostLoading && !posts ? (
              <Loader/>
            ) : (
              <ul>
                test
              </ul>
            )}
        </div>
      </div>
    </div>
  )
}

export default Home