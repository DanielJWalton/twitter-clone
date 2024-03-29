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
import SidebarMobile2 from '../components/SidebarMobile2'
import { BoxProvider } from '../context/BoxContext'

interface Props {
  tweets: Tweet[]
}

const Home = ({ tweets }: Props) => {
  return (
    <div className="lg:max-w-screen twit-dark mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Twitter Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Toaster />
      </div>

      <main className="twit-dark mx-auto grid grid-cols-10 md:max-w-3xl lg:max-w-6xl">
        <Sidebar tweets={tweets} />
        <SidebarMobile tweets={tweets} />

        <Feed tweets={tweets} />
        <Widgets />
        <SidebarMobile2 tweets={tweets} />
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
