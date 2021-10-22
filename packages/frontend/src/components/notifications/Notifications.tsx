import type { TransactionResponse } from '@ethersproject/providers'
import { useToasts } from '@geist-ui/react'
import {
  getExplorerTransactionLink,
  Notification,
  useNotifications,
  useTransactions,
  getStoredTransactionState,
  StoredTransaction,
  shortenTransactionHash,
  useEthers,
} from '@usedapp/core'
import React, { ReactElement, useEffect } from 'react'

const Icon = () => null
const notificationContent: {
  [key in Notification['type']]: { title: string; icon: ReactElement }
} = {
  transactionFailed: { title: 'Transaction failed', icon: <Icon /> },
  transactionStarted: { title: 'Transaction started', icon: <Icon /> },
  transactionSucceed: { title: 'Transaction succeed', icon: <Icon /> },
  walletConnected: { title: 'Wallet connected', icon: <Icon /> },
}

const Notifications = () => {
  const { notifications } = useNotifications()
  const { error } = useEthers()
  const [toasts, setToast] = useToasts()

  useEffect(() => {
    if (error) {
      setToast({
        text: error.message,
        type: 'error',
      })
    }
  }, [error])

  useEffect(() => {
    notifications.forEach((notification) => {
      setToast({ text: notificationContent[notification.type].title })
    })
  }, [notifications])

  return null
}

export default Notifications
