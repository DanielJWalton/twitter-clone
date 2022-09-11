import React, { useState } from 'react'
import { HiOutlineRefresh } from 'react-icons/hi'
import { Tweet } from '../typings'
import TweetBox from './TweetBox'
import TweetComponent from '../components/Tweet'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'
import { GetServerSideProps } from 'next'

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

  const [showMe, setShowMe] = useState(false)
  function toggle() {
    setShowMe(!showMe)
    {
    }
  }

  return (
    <>
      <button
        className="z-90 fixed right-10 bottom-20 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-center 
        text-2xl text-white drop-shadow-lg duration-300 hover:animate-bounce hover:bg-blue-700 
        hover:drop-shadow-2xl md:right-96 lg:hidden"
        onClick={toggle}
      >
        +
      </button>
      <div className=" col-span-11 max-h-screen overflow-y-scroll scroll-smooth border-x border-[#38444d] scrollbar-hide md:col-span-5 lg:col-span-5">
        <div
          style={{
            display: showMe ? 'block' : 'none',
          }}
        >
          <div className="sticky top-0 z-30  ">
            <TweetBox
              setTweets={setTweets}
              setIsFetching={setIsFetching}
              tweets={[]}
            />
          </div>
        </div>
        {/* feed */}
        <div>
          {tweets.map((tweet) => (
            <TweetComponent key={tweet._id} tweet={tweet} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Feed

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets()

  return {
    props: {
      tweets,
    },
  }
}
