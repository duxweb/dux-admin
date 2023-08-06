import React, { lazy, useRef } from 'react'
import { useNavigation, useTranslate } from '@refinedev/core'
import { PrimaryTableCol, Button, Input, DialogPlugin } from 'tdesign-react/esm'
import { PageTable, FilterItem, CardTableRef } from '@/components/table'
import { lazyComponent } from '@/core/package'
import BlogPostCreate from './create'
import { Modal, openModal } from '@/components/modal'

export const BlogPostList = () => {
  const translate = useTranslate()
  const { edit, show, create } = useNavigation()

  const table = useRef<CardTableRef>(null)

  const columns = React.useMemo<PrimaryTableCol[]>(
    () => [
      {
        colKey: 'id',
        sorter: true,
        sortType: 'all',
        title: translate('blog_posts.fields.id'),
        width: 100,
      },
      {
        colKey: 'title',
        title: translate('blog_posts.fields.title'),
        minWidth: 200,
      },
      {
        colKey: 'status',
        title: translate('blog_posts.fields.status'),
        width: 100,
      },
      {
        colKey: 'createdAt',
        title: translate('blog_posts.fields.createdAt'),
        sorter: true,
        sortType: 'all',
        width: 200,
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
        width: 180,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <PageTable
      ref={table}
      columns={columns}
      title={translate('blog_posts.fields.title')}
      headerRender={() => {
        return (
          <>
            <Button
              onClick={() => {
                openModal({
                  title: '创建',
                  desc: '创建内容',
                  component: () => import('./create'),
                })
              }}
            >
              创建
            </Button>
          </>
        )
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
      batchRender={
        <>
          <div
            onClick={() => {
              table.current?.refetch()
            }}
          >
            w
          </div>
        </>
      }
    />
  )
}
