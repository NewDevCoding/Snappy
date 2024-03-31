import { Models } from 'appwrite';
import GridPostList from './GridPostList';
import Loader from './Loader';


type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
}

const SearchResults = ({ isSearchFetching, searchedPosts}: SearchResultProps) => {
  if(isSearchFetching) return <Loader />

  console.log(searchedPosts)

  if(searchedPosts && searchedPosts.documents.length > 0){
    return(
      <GridPostList posts={searchedPosts.documents}/>
    )
  }
  return (
    <p className='text-light-4 mt-4 text-center w-full'>No Results Found</p>
  )
}

export default SearchResults