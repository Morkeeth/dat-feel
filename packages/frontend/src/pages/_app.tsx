import * as React from 'react'
import { FC } from 'react'
import { AppProps } from 'next/app'
import MainLayout from '../components/layout/MainLayout'
import Web3Provider from '../web3/Web3Provider'
import ThemeProvider from '../providers/ThemeProvider'
import { UiContextProvider } from '../contexts/UiContext'
import { MarketContextProvider } from '../contexts/MarketContext'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <UiContextProvider>
      <ThemeProvider>
        <Web3Provider>
          <MarketContextProvider>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </MarketContextProvider>
        </Web3Provider>
      </ThemeProvider>
    </UiContextProvider>
  )
}

export default App
