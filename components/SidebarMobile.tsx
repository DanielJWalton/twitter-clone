import React, { useState } from 'react'
import SidebarRow from './SidebarRow'
import { HiOutlineRefresh } from 'react-icons/hi'

import {
  BellIcon,
  HomeIcon,
  UserIcon,
  MailIcon,
  CollectionIcon,
  BookmarkIcon,
  HashtagIcon,
  DotsCircleHorizontalIcon,
} from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Tweet } from '../typings'
import toast from 'react-hot-toast'
import { fetchTweets } from '../utils/fetchTweets'
import SidebarRow2 from './SidebarRow2'

interface Props {
  tweets: Tweet[]
}

const SidebarMobile = ({ tweets: tweetsProp }: Props) => {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
  const [isFetching, setIsFetching] = useState(false)
  const handleRefresh = async () => {
    setIsFetching(true)
    const refreshToast = toast.loading('Refreshing...')
    const tweets = await fetchTweets()
    setTweets(tweets)
    setIsFetching(false)

    toast.success('Feed Updated!', {
      id: refreshToast,
    })
  }
  const { data: session } = useSession()
  return (
    <div className="sticky bottom-0 mx-auto inline h-14  w-screen border-b border-[#38444d] bg-gray-900 py-1 px-1 text-white scrollbar-hide md:hidden  ">
      <div className="align-center flex justify-between text-center ">
        <SidebarRow2
          onClick={session ? signOut : signIn}
          title={session ? 'Sign Out' : 'Sign In'}
          Icon={UserIcon}
        />

        {session ? (
          <p className="mx-auto pt-3 text-center">Twitter</p>
        ) : (
          <p className="mx-auto pt-3 text-center">Sign In to Tweet</p>
        )}

        <SidebarRow2
          title="Refresh"
          Icon={HiOutlineRefresh}
          onClick={handleRefresh}
        />
      </div>
    </div>
  )
}

export default SidebarMobile
