import * as React from 'react'
import { FC } from 'react'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import MainLayout from '../components/layout/MainLayout'
import Web3Provider from '../web3/Web3Provider'
import ThemeProvider from '../providers/ThemeProvider'
import { UiContextProvider } from '../contexts/UiContext'
import { orgStore } from '../stores/orgStore'

const queryClient = new QueryClient()
const App: FC<AppProps> = ({ Component, pageProps }) => {
  React.useEffect(() => {
    orgStore.fetch()
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <UiContextProvider>
        <ThemeProvider>
          <Web3Provider>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </Web3Provider>
        </ThemeProvider>
      </UiContextProvider>
    </QueryClientProvider>
  )
}

export default App
