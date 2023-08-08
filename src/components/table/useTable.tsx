import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  useTable as useRefineTable,
  useTableProps as useRefineTableProps,
  Pagination,
  BaseRecord,
  HttpError,
  LogicalFilter,
  CrudSorting,
  CrudSort,
} from '@refinedev/core'
import { TableSort, SortInfo, SortOptions, Form, PaginationProps } from 'tdesign-react/esm'
import { InternalFormInstance } from 'tdesign-react/esm/form/hooks/interface'

export interface useTableProps<TQueryFnData, TError, TData>
  extends useRefineTableProps<TQueryFnData, TError, TData> {
  pagination: Pagination
}

export interface useTableReturnType<TData> {
  data: Array<TData>
  filters: Record<string, any>
  setFilters: (values: Record<string, unknown>) => void
  sorters: TableSort
  setSorters: (sort: TableSort, options: SortOptions<TData>) => void
  selecteds: Array<string | number>
  setSelecteds: (selectedRowKeys: Array<string | number>) => void
  pagination: PaginationProps
  loading: boolean
  refetch: () => void
}

const formatFilter = (values: Record<string, any>) => {
  return Object.keys(values).map((key) => ({
    field: key,
    value: values[key],
  })) as LogicalFilter[]
}

const formatValues = (filters: LogicalFilter[]) => {
  return filters.reduce<Record<string, any>>((acc, item) => {
    acc[item.field] = item.value
    return acc
  }, {})
}

const formatSorters = (sort: TableSort): CrudSorting => {
  const sorters: Array<SortInfo> = []
  if (!Array.isArray(sort) && sort !== undefined) {
    sorters.push(sort)
  }
  if (Array.isArray(sort) && sort !== undefined) {
    sorters.push(...sort)
  }
  return sorters.map((item) => ({
    field: item?.sortBy,
    order: item?.descending ? 'desc' : 'asc',
  }))
}

export const useTable = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData
>(
  props: useTableProps<TQueryFnData, TError, TData>
): useTableReturnType<TData> => {
  const {
    tableQueryResult,
    current,
    setCurrent,
    pageSize,
    setPageSize,
    setSorters,
    sorters,
    filters,
    setFilters,
  } = useRefineTable(props)

  const [data, setData] = useState<Array<any>>([])
  const [total, setTotal] = useState(0)
  const [selecteds, setSelecteds] = useState<Array<string | number>>([])

  // Selected
  const setOnSelecteds = (selectedRowKeys: Array<string | number>) => {
    setSelecteds(selectedRowKeys)
  }

  // Data
  useEffect(() => {
    setData(tableQueryResult?.data?.data ?? [])
    setTotal(tableQueryResult?.data?.total ?? 0)
  }, [tableQueryResult?.data])

  // Sorter
  const setOnSorters = (sort: TableSort) => {
    setSorters(formatSorters(sort))
  }

  const getSorters = useMemo(() => {
    return sorters.map((item: CrudSort) => ({
      sortBy: item.field,
      descending: item.order === 'desc',
    }))
  }, [sorters])

  // Filter
  const setOnFilters = (values: Record<string, unknown>) => {
    setFilters(formatFilter(values))
  }

  const getFilters = useMemo(() => {
    return formatValues(filters as LogicalFilter[])
  }, [filters])

  // Pagination
  const pagination: PaginationProps = useMemo(() => {
    return {
      current,
      pageSize,
      total,
      onChange(pageInfo) {
        setCurrent(pageInfo.current)
        setPageSize(pageInfo.pageSize)
      },
    }
  }, [current, pageSize, setCurrent, setPageSize, total])

  // Refetch
  const refetch = useCallback(() => {
    tableQueryResult.refetch()
  }, [tableQueryResult])

  return {
    data: data,
    filters: getFilters,
    setFilters: setOnFilters,
    sorters: getSorters,
    setSorters: setOnSorters,
    selecteds: selecteds,
    setSelecteds: setOnSelecteds,
    loading: tableQueryResult?.isLoading,
    pagination: pagination,
    refetch: refetch,
  }
}
