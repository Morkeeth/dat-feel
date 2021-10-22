import * as React from 'react'
import { FC } from 'react'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import MainLayout from '../components/layout/MainLayout'
import Web3Provider from '../web3/Web3Provider'
import ThemeProvider from '../providers/ThemeProvider'
import { UiContextProvider } from '../contexts/UiContext'
import { TasksContextProvider } from '../contexts/TasksContext'

const queryClient = new QueryClient()
const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UiContextProvider>
        <ThemeProvider>
          <Web3Provider>
            <TasksContextProvider>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </TasksContextProvider>
          </Web3Provider>
        </ThemeProvider>
      </UiContextProvider>
    </QueryClientProvider>
  )
}

export default App
