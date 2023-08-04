import { useState } from 'react'
import { Main, MainHeader } from '../main'
import { CardTable, CardTableProps } from './table'

export interface PageTableProps extends CardTableProps {
  title?: string
  headerRender?: () => React.ReactNode
}

export const PageTable = ({ title, headerRender, table, filterRender }: PageTableProps) => {
  const [filter, setFilter] = useState<Record<string, any>>({
    qqq: '333',
  })
  return (
    <Main>
      <MainHeader>{headerRender?.()}</MainHeader>
      <CardTable
        title={title}
        table={{ ...table }}
        filterRender={filterRender}
        filterData={filter}
        onFilterChange={(values) => {
          //setFilter(values)
          //console.log(values)
        }}
      />
    </Main>
  )
}
