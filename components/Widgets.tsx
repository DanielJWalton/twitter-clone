import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import {TwitterTimelineEmbed} from 'react-twitter-embed'

function Widgets() {
  return (
    <div className="px-2 mt-2 items-end col-span-4 lg:col-span-3  hidden md:inline twit-dark scrollbar-hide">
 
        {/* Search Box*/}
        <div className="flex items-center space-x-2 twit-dark p-3 rounded-md mt-2">
            <SearchIcon className='h-5 w-5 text-gray-400'/>
            <input type='text'
             className='bg-transparent flex-1 outline-none'
             placeholder='Search Twitter' />
        </div>

        <TwitterTimelineEmbed
        theme='dark'
        sourceType="profile"
        screenName="MaruonVHS"
        options={{height: 1000}}
        />
    </div>
  )
}

export default Widgets