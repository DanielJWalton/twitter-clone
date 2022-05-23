import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline'
import React, { useRef, useState } from 'react'

import { useSession } from 'next-auth/react'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import { toast } from 'react-hot-toast'


interface Props {
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
}
const TweetBox = ({ setTweets, setIsFetching }: Props) => {
  const { data: session } = useSession()
  const [input, setInput] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)
  const [imageUrlInvalid, setImageUrlInvalid] = useState<boolean>(false)
  const imageInputRef = useRef<HTMLInputElement>(null)


  async function postTweet() {
    const tweetBody: TweetBody = {
      text: input,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
      image: image,
    }

    const result = await fetch(`api/addTweets`, {
      body: JSON.stringify(tweetBody),
      method: 'POST',
    })

    const json = await result.json()

    const newTweets = await fetchTweets()
    setTweets(newTweets)
    toast.success('Tweet Posted!')
    return json
  }


  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsFetching(true)
    postTweet()
    setInput('')
    setImage('')
    setImageUrlBoxIsOpen(false)
    setIsFetching(false)
  }
  const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (!imageInputRef.current?.value) return
    if (imageInputRef.current.value.slice(0, 8) !== 'https://') {
      setImageUrlInvalid(true)
    } else {
      setImage(imageInputRef.current.value)
      imageInputRef.current.value = ''
      setImageUrlInvalid(false)
      setImageUrlBoxIsOpen(false)
    }
  }

  return (
    <div className="flex space-x-2 p-2 scroll-none twit-dark text-white border-gray-600">
      <img
        src={session?.user?.image || 'https://links.papareact.com/gll'}
        alt=""
        className="mt-4 h-14 w-14 rounded-full"
      />

      <div className="flex flex-1 items-center twit-dark pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-24 w-full twit-dark text-xl outline-none placeholder:text-xl"
            type="text"
            placeholder={session ? "What's Happening?" : 'Sign in to Tweet...'}
          />
          <div className="flex">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon
                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />

              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>

            <button
              disabled={!input || !session}
              onClick={handleSubmit}
              className="rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-40"
            >
              Tweet
            </button>
          </div>

          {imageUrlBoxIsOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                placeholder="Enter Image URL..."
                type="text"
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add Image
              </button>
            </form>
          )}

          {image && (
            <img
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
              src={image}
              alt=""
            />
          )}
        </form>
      </div>
    </div>
  )
}

export default TweetBox