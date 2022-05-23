import React, { useState } from 'react'
import { HiOutlineRefresh } from 'react-icons/hi'
import { Tweet } from '../typings'
import TweetBox from './TweetBox'
import TweetComponent from '../components/Tweet'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'

interface Props {
  tweets: Tweet[]
}

const Feed = ({ tweets: tweetsProp }: Props) => {
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
  return (
    <div className="col-span-11 max-h-screen  overflow-y-scroll scroll-smooth border-x border-[#38444d] md:col-span-7  lg:col-span-5 scrollbar-hide">
    {/* <div className="sticky top-0 twit-dark z-50 flex items-center justify-between   ">
      
      <h1 className="p-3 pb-0 text-xl font-bold text-white">Home</h1>
      <HiOutlineRefresh
        onClick={handleRefresh}
        className="mr-5 mt-5 h-8 w-8 cursor-pointer text-white transition-all duration-500 ease-out hover:rotate-180 hover:text-twitter active:scale-125"
      />
    </div> */}

    <div className="sticky top-0 z-30  ">
      <TweetBox setTweets={setTweets} setIsFetching={setIsFetching}/>
    </div>
    {/* feed */}
    <div>
      {tweets.map((tweet) => (
        <TweetComponent key={tweet._id} tweet={tweet} />
      ))}
    </div>
  </div>
  )
}

export default Feed