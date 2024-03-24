import GridPostList from '@/components/shared/GridPostList';
import PostStats from '@/components/shared/PostStats';
import SearchResults from '@/components/shared/SearchResults';
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const Explore = () => {
  const [searchValue, setSearchValue] = useState('')

  // const posts = []

  // const shouldShowSearchResults = searchValue !== '';
  // const shouldShowPosts = !shouldShowSearchResults && PostStats.pages.every((item) => item.document.length === 0);

  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>
        <h2 className="h3-bold md:h2-bold w-full">Explore Posts</h2>
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
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-3 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
          src='/assets/icons/filter.svg'
          alt='filter'
          height={20}
          width={20}
          />
        </div>
      </div>

      {/* <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
        {shouldShowSearchResults ? (
          <SearchResults 
          
          />
        ): shouldShowPosts ? (
          <p className='text-light-4 mt-10 text-center w-full'>End of Posts</p>
        ): PostStats.pages.map((item, index) => (
          <GridPostList key={`page-${index}`} posts={item.documents} />
        ))
        }
      </div> */}

    </div>
  )
}

export default Explore