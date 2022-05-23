import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import { Toaster } from 'react-hot-toast'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import Widgets from '../components/Widgets'
import SidebarMobile from '../components/SidebarMobile'

interface Props {
  tweets: Tweet[]
}

const Home = ({ tweets }: Props) => {
  return (
    <div className="mx-auto max-h-screen overflow-hidden lg:max-w-screen twit-dark">
      <Head>
        <title>Twitter Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Toaster />
      </div>

      <main className="grid grid-cols-10 twit-dark">
      
      <Sidebar />
      <SidebarMobile />


   

        <Feed tweets={tweets} />

        <Widgets />
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets()
  const session = await getSession(context)

  return {
    props: {
      tweets,
      session,
    },
  }
}