
import React, { useEffect, useState } from 'react'
import { Comment, CommentBody, Tweet } from '../typings'
import TimeAgo from 'react-timeago'
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { fetchComments } from '../utils/fetchComments'
import Image from 'next/image'

interface Props {
  tweet: Tweet
}

const Tweet = ({
  tweet: { text, username, profileImg, image },
  tweet,
}: Props) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')
  const { data: session } = useSession()

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComments(comments)
  }

  useEffect(() => {
    refreshComments()
  }, [])

  async function postComments() {
    const commentBody: CommentBody = {
      comment: comment,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
      tweetId: tweet._id,
    }

    const result = await fetch(`api/addComment`, {
      body: JSON.stringify(commentBody),
      method: 'POST',
    })

    const json = await result.json()

    const newComments = await fetchComments(tweet._id)
    setComments(newComments)
    toast.success('Comment Posted!')
    return json
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    postComments()
    setComment('')
    setCommentBoxVisible(false)
  }

  function truncateString(str: string, num: number) {
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
      return str
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...'
  }
  return (
    <div className="flex twit-dark text-white flex-col space-x-3 border-y border-gray-600 p-5">
      <div className="flex space-x-3">
        <div className="relative h-10 w-10 flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.profileImg || 'https://links.papareact.com/gll'}
          alt=""
        />
        </div>
        <div className="w-full">
          <div className="flex items-center space-x-1">
            <p className="mr-1 text-sm font-bold sm:text-base">
              {truncateString(username, 10)}
            </p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{username.replace(/\s+/g, '').toLowerCase()} .
            </p>
            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>

          <p className="pt-1">{text}</p>
          {image && (
            <div className="relative m-5 ml-0 mb-1 aspect-auto h-44 shadow-sm">
              <Image
                src={`${
                  process.env.NEXT_PUBLIC_BASE_URL
                }/api/imageproxy?url=${encodeURIComponent(image)}`}
                alt="tweet image"
                objectFit="contain"
                layout="fill"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-between">
        <div
          onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
          className="flex cursor-pointer items-center space-x-3 text-gray-400"
        >
          <ChatAlt2Icon className="h-5 w-5" />
          <p>{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <SwitchHorizontalIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <UploadIcon className="h-5 w-5" />
        </div>
      </div>
      {/* Comment Box logic */}
      {commentBoxVisible && (
        <form className="mt-3 flex space-x-3 twit-dark">
          <input
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className="flex-1 rounded-lg bg-gray-100 p-2 text-xs outline-none sm:text-base"
            type="text"
            placeholder="Write a comment..."
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="text-twitter disabled:cursor-not-allowed disabled:text-gray-200"
            disabled={!comment}
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-600  p-12 scrollbar-hide">
          {comments.map((comment) => (
            <div className="relative flex space-x-2" key={comment._id}>
              <hr className="absolute top-10 left-5 h-8 border-x border-gray-600 bg-twitter/30" />

              <div className="relative mt-2 h-7 w-7 flex-shrink-0">
                <Image
                  src={`${
                    process.env.NEXT_PUBLIC_BASE_URL
                  }/api/imageproxy?url=${encodeURIComponent(
                    comment.profileImg
                  )}`}
                  alt="profile image"
                  objectFit="cover"
                  layout="fill"
                  className="rounded-full"
                />
              </div>

              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">
                    {truncateString(comment.username, 10)}
                  </p>
                  <p className="hidden text-sm text-gray-500 sm:inline">
                    @{comment.username.replace(/\s+/g, '').toLowerCase()} .
                  </p>
                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tweet