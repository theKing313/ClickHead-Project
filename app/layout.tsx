/* Components */
import { Providers } from '@/lib/providers'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
/* Instruments */
// import styles from './styles/layout.module.css'
import './globals.css'
import './main.scss'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en" className='dark'>
        <body className={inter.className}>
          <section >
            <main >{props.children}</main>
          </section>
        </body>
      </html>
    </Providers>
  )
}
