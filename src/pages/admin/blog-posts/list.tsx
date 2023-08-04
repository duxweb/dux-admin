import React, { useEffect, useState } from 'react'
import {
  IResourceComponentsProps,
  useNavigation,
  useTranslate,
  GetManyResponse,
  useMany,
} from '@refinedev/core'
import { useTable, HttpError } from '@refinedev/core'
import { ColumnDef, flexRender } from '@tanstack/react-table'
import {
  PrimaryTableCol,
  TableSort,
  SortOptions,
  Card,
  Button,
  Input,
  TableProps,
} from 'tdesign-react'
import { Main, MainHeader } from '@/components/main'
import { PageTable, FilterItem } from '@/components/table'

export const BlogPostList = () => {
  const translate = useTranslate()

  const columns = React.useMemo<PrimaryTableCol[]>(
    () => [
      {
        colKey: 'id',
        sorter: true,
        sortType: 'all',
        title: translate('blog_posts.fields.id'),
      },
      {
        colKey: 'title',
        title: translate('blog_posts.fields.title'),
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
        colKey: 'status',
        title: translate('blog_posts.fields.status'),
      },
      {
        colKey: 'createdAt',
        title: translate('blog_posts.fields.createdAt'),
        sorter: true,
        sortType: 'all',
        cell: ({ row }) => {
          return new Date(row.createdAt).toLocaleString(undefined, {
            timeZone: 'UTC',
          })
        },
      },
      {
        colKey: 'link',
        title: translate('table.actions'),
        fixed: 'right',
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

  //console.log(tableQueryResult)

  return (
    <PageTable
      title={translate('blog_posts.fields.title')}
      table={{
        rowKey: 'id',
        columns: columns,
      }}
      headerRender={() => {
        return <Button>创建</Button>
      }}
      filterRender={() => {
        return (
          <>
            <FilterItem name={'test1'}>
              <Input />
            </FilterItem>
            <FilterItem name={'test2'}>
              <Input />
            </FilterItem>
          </>
        )
      }}
    />
  )
}
