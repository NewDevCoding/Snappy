import Loader from '@/components/shared/Loader'
import UserCard from '@/components/shared/UserCard'
import { useToast } from '@/components/ui/use-toast'
import { useGetUsers } from '@/srclib/react-query/queriesAndMutations'


const AllUsers = () => {

  const { toast } = useToast()

  const { data: Creators, isLoading, isError: isErrorCreators} = useGetUsers()

  if(isErrorCreators){
    toast({title: 'Error. Please try again'})


    return
  }

  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>
        <h2 className="h3-bold md:h2-bold w-full">All Users</h2>
        {isLoading && !Creators ? (
          <Loader/>
        ):(
          <ul className='user-grid'>
              {Creators?.documents.map((creator) => (
                <li key={creator.$id} className="flex-1 min-w-[200px] w-full  ">
                  <UserCard user={creator} />
                </li>
              ))}
          </ul>
        )}
        
      </div>
    </div>
  )

}

export default AllUsers