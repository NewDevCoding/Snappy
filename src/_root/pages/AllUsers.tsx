import Loader from '@/components/shared/Loader'
import UserCard from '@/components/shared/UserCard'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import useDebounce from '@/hooks/useDebounce'
import { useGetUsers, useSearchUsers } from '@/srclib/react-query/queriesAndMutations'
import { useState } from 'react'


const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedValue = useDebounce(searchTerm, 500)
  const { toast } = useToast()
  const { data: searchedUsers, isFetching: isSearchFetching} = useSearchUsers(debouncedValue)
  const { data: Creators, isLoading, isError: isErrorCreators} = useGetUsers()
  

  if(isErrorCreators){
    toast({title: 'Error. Please try again'})


    return
  }

  const shouldShowSearchResults = searchTerm !== '';
  

  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>
        <h2 className="h3-bold md:h2-bold w-full">All Users</h2>

        <div className='flex gap-1 px-4 w-full rounded-lg bg-dark-4'>
          <img 
          src='/assets/icons/search.svg'
          alt='search'
          height={24}
          width={24}
          />
          <Input 
          type='text'
          placeholder='Search'
          className='explore-search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

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