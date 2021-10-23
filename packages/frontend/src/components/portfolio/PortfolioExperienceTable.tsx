import * as React from 'react'
import { FC } from 'react'
import Link from 'next/link'
import { Table, Spacer, Text } from '@geist-ui/react'

const PortfolioExperienceTable: FC = ({ user }) => {
  const renderAction = (value, rowData, rowIndex) => {
    return <Link href={`/task/${rowData.id}`}>View task</Link>
  }

  return (
    <div>
      <Text h2>Experience</Text>
      <Table data={user.completedTasks}>
        <Table.Column prop="status" label="status" />
        <Table.Column prop="title" label="title" />
        <Table.Column prop="organization" label="organization" />
        <Table.Column prop="completedAt" label="completed" />
        <Table.Column prop="price" label="price" />
        <Table.Column prop="operation" label="operation" width={200} render={renderAction} />
      </Table>
      <Spacer h={2} />
    </div>
  )
}

export default PortfolioExperienceTable
