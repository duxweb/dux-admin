import React from 'react'
import {
  IResourceComponentsProps,
  useNavigation,
  useTranslate,
  GetManyResponse,
  useMany,
} from '@refinedev/core'
import { useTable } from '@refinedev/react-table'
import { ColumnDef, flexRender } from '@tanstack/react-table'
import { Table } from 'tdesign-react'
import { Main, MainHeader } from '@/components/main'

export const BlogPostList = () => {
  const translate = useTranslate()
  const columns = React.useMemo(
    () => [
      {
        id: 'id',
        colKey: 'id',
        title: translate('blog_posts.fields.id'),
      },
      {
        id: 'title',
        colKey: 'title',
        title: translate('blog_posts.fields.title'),
      },
      {
        id: 'content',
        colKey: 'content',
        title: translate('blog_posts.fields.content'),
      },
      // {
      //   id: 'category',
      //   title: translate('blog_posts.fields.category'),
      //   colKey: 'category.id',
      //   cell: ({ getValue, table }) {
      //     const meta = table.options.meta as {
      //       categoryData: GetManyResponse
      //     }

      //     try {
      //       const category = meta.categoryData?.data?.find((item) => item.id == getValue<any>())

      //       return category?.title ?? 'Loading...'
      //     } catch (error) {
      //       return null
      //     }
      //   },
      // },
      {
        id: 'status',
        colKey: 'status',
        title: translate('blog_posts.fields.status'),
      },
      {
        id: 'createdAt',
        colKey: 'createdAt',
        title: translate('blog_posts.fields.createdAt'),
        cell: ({ row }) => {
          return new Date(row.createdAt).toLocaleString(undefined, {
            timeZone: 'UTC',
          })
        },
      },
      {
        id: 'actions',
        colKey: 'id',
        title: translate('table.actions'),
        cell: ({ row }) => {
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '4px',
              }}
            >
              <button
                onClick={() => {
                  show('blog_posts', row.id)
                }}
              >
                {translate('buttons.show')}
              </button>
              <button
                onClick={() => {
                  edit('blog_posts', row.id)
                }}
              >
                {translate('buttons.edit')}
              </button>
            </div>
          )
        },
      },
    ],
    [translate]
  )

  const { edit, show, create } = useNavigation()

  return (
    <Main>
      <MainHeader></MainHeader>

      <Table
        data={[]}
        columns={columns}
        rowKey='index'
        verticalAlign='top'
        rowClassName={({ rowIndex }) => `${rowIndex}-class`}
        cellEmptyContent={'-'}
        resizable
        bordered
      />
    </Main>
    /* <div style={{ padding: '16px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1>{translate('blog_posts.titles.list')}</h1>
        <button onClick={() => create('blog_posts')}>{translate('buttons.create')}</button>
      </div>
      <div style={{ maxWidth: '100%', overflowY: 'scroll' }}>
        <table>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {!header.isPlaceholder &&
                      flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '12px' }}>
        <button onClick={() => setPageIndex(0)} disabled={!getCanPreviousPage()}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!getCanPreviousPage()}>
          {'<'}
        </button>
        <button onClick={() => nextPage()} disabled={!getCanNextPage()}>
          {'>'}
        </button>
        <button onClick={() => setPageIndex(getPageCount() - 1)} disabled={!getCanNextPage()}>
          {'>>'}
        </button>
        <span>
          <strong>
            {' '}
            {getState().pagination.pageIndex + 1} / {getPageCount()}{' '}
          </strong>
        </span>
        <span>
          | {translate('pagination.go')}:{' '}
          <input
            type='number'
            defaultValue={getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              setPageIndex(page)
            }}
          />
        </span>{' '}
        <select
          value={getState().pagination.pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {translate('pagination.show')} {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div> */
  )
}
