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


interface Props {
  tweets: Tweet[]
}

const  SidebarMobile =({tweets: tweetsProp}: Props) =>{
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
    <div className="sticky scrollbar-hide bottom-0 inline  w-screen border-b border-[#38444d] py-1 px-1 md:hidden  text-white  ">
      <div className="flex align-center text-center justify-between ">
        <SidebarRow title="Home" Icon={HomeIcon} />
        <SidebarRow title="Noti" Icon={BellIcon} />
        <SidebarRow
          title="Sign In"
          Icon={UserIcon}
          onClick={session ? signOut : signIn}
        />
        <SidebarRow title='refresh' Icon={HiOutlineRefresh}
        onClick={handleRefresh}
      />
      </div>
    </div>
  )
}

export default SidebarMobile