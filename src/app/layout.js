import './globals.css'
import Head from "next/head"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MovieBox',
  description: 'A Website that display movies | Developed by Elis Joshua',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
      </Head>
      <body>{children}</body>
    </html>
  )
}
