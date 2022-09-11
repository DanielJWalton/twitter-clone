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

const SidebarMobile2 = ({ tweets: tweetsProp }: Props) => {
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
    <div className="mobileB - sticky  bottom-0 inline  h-14  w-screen border-b border-[#38444d] bg-gray-900 py-1 px-1 text-white scrollbar-hide md:hidden ">
      <div className="align-center flex justify-between bg-gray-900 text-center ">
        <SidebarRow title="Home" Icon={HomeIcon} />
        <SidebarRow title="Noti" Icon={BellIcon} />
        <SidebarRow title="BookMark" Icon={BookmarkIcon} />
        <SidebarRow title="Mail" Icon={MailIcon} />
      </div>
    </div>
  )
}

export default SidebarMobile2
