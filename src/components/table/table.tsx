import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTable, CrudFilter, LogicalFilter } from '@refinedev/core'
import {
  EnhancedTable as TdTable,
  TableSort,
  TableProps,
  Form,
  NamePath,
  Card,
  PrimaryTableCol,
  SelectOptions,
} from 'tdesign-react'
import { useWindowSize } from '@/core/helper'

export interface CardTableProps {
  title?: React.ReactNode
  header?: React.ReactNode
  banner?: React.ReactNode
  footer?: React.ReactNode
  table?: TableProps
  rowKey?: string
  columns?: PrimaryTableCol[]
  filterData?: Record<string, any>
  filterRender?: () => React.ReactNode
  onFilterChange?: (values: Record<string, any>) => void
  batchRender?: (
    rowKeys?: Array<string | number>,
    selectedOptions?: SelectOptions<any>
  ) => React.ReactNode
}

export const CardTable = ({
  title,
  filterData,
  filterRender,
  onFilterChange,
  rowKey,
  table,
  columns,
  header,
  banner,
  footer,
  batchRender,
}: CardTableProps) => {
  const [data, setData] = useState<Array<any>>([])
  const [total, setTotal] = useState(0)
  const [sort, setSort] = useState<TableSort>([])

  const {
    tableQueryResult,
    current,
    setCurrent,
    pageSize,
    setPageSize,
    setSorters,
    filters,
    setFilters,
  } = useTable({
    pagination: {
      current: 0,
      pageSize: 10,
    },
  })

  const formatValues = useCallback((filters: LogicalFilter[]) => {
    return filters.reduce<Record<string, any>>((acc, item) => {
      acc[item.field] = item.value
      return acc
    }, {})
  }, [])

  const formatFilter = useCallback((values: Record<string, any>) => {
    return Object.keys(values).map((key) => ({
      field: key,
      value: values[key],
    })) as LogicalFilter[]
  }, [])

  useEffect(() => {
    setData(tableQueryResult?.data?.data ?? [])
    setTotal(tableQueryResult?.data?.total ?? 0)
  }, [tableQueryResult?.data])

  const initData = useMemo(() => {
    return formatValues(filters as LogicalFilter[])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log(filterData)
    setFilters(formatFilter(filterData || {}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData])

  useEffect(() => {
    onFilterChange?.(formatValues(filters as LogicalFilter[]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const [size, sizeMap] = useWindowSize()
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<string | number>>()
  const [selectedOptions, setSelectedOptions] = useState<SelectOptions<any>>()

  const tableCloumns = useMemo(() => {
    let cols = columns || []
    if (batchRender) {
      cols = [
        {
          colKey: 'row-select',
          type: 'multiple',
        },
        ...cols,
      ]
    }
    return cols
  }, [batchRender, columns])

  return (
    <Card
      headerBordered
      header={
        <div className='flex flex-1 items-center justify-between'>
          {header || <div className='text-base'>{title}</div>}
          <div>
            <Form
              labelWidth={0}
              className='flex flex-row gap-2'
              initialData={initData}
              onValuesChange={(values) => {
                setFilters(formatFilter(values))
              }}
            >
              {filterRender?.()}
            </Form>
          </div>
        </div>
      }
    >
      {banner}
      <TdTable
        {...table}
        rowKey={rowKey || 'id'}
        columns={tableCloumns}
        data={data}
        cellEmptyContent={'-'}
        stripe
        showSortColumnBgColor={true}
        loading={tableQueryResult.isLoading}
        pagination={{
          current,
          pageSize,
          total,
          showJumper: true,
          onChange(pageInfo) {
            setCurrent(pageInfo.current)
            setPageSize(pageInfo.pageSize)
          },
          totalContent: batchRender ? (
            <div>{batchRender?.(selectedRowKeys, selectedOptions)}</div>
          ) : undefined,
          theme: table?.pagination?.theme || size <= sizeMap.xl ? 'simple' : 'default',
        }}
        sort={sort}
        multipleSort
        onSortChange={(sort: TableSort) => {
          setSort(sort)
          const sorters = []
          if (!Array.isArray(sort) && sort !== undefined) {
            sorters.push(sort)
          }
          if (Array.isArray(sort) && sort !== undefined) {
            sorters.push(...sort)
          }
          setSorters(
            sorters.map((item) => ({ field: item.sortBy, order: item.descending ? 'desc' : 'asc' }))
          )
        }}
        selectedRowKeys={selectedRowKeys}
        onSelectChange={(selectedRowKeys, options) => {
          setSelectedRowKeys(selectedRowKeys)
          setSelectedOptions(options)
        }}
      />
      {footer}
    </Card>
  )
}

export interface FilterItemProps {
  children: React.ReactNode
  name: NamePath
}
export const FilterItem = ({ name, children }: FilterItemProps) => {
  return (
    <Form.FormItem name={name} className='m-0 p-0'>
      {children}
    </Form.FormItem>
  )
}
