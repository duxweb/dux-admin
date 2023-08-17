import React, { lazy, useRef } from 'react'
import { useNavigation, useTranslate } from '@refinedev/core'
import { PrimaryTableCol, Button, Input, DialogPlugin } from 'tdesign-react/esm'
import { PageTable, FilterItem, CardTableRef, lazyComponent, Modal } from '@duxweb/dux-refine'

const statusNameListMap = {
  0: { label: '审批通过', theme: 'success' },
  1: { label: '审批失败', theme: 'danger' },
  2: { label: '审批过期', theme: 'warning' },
}

export const BlogPostList = () => {
  const translate = useTranslate()
  const { edit, show, create } = useNavigation()

  const table = useRef<CardTableRef>(null)

  const columns = React.useMemo<PrimaryTableCol[]>(
    () => [
      { colKey: 'row-select', type: 'multiple' },
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
        filter: {
          type: 'single',
          list: [
            { label: '审批通过', value: '0' },
            { label: '已过期', value: '1' },
            { label: '审批失败', value: '2' },
          ],
        },
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
              <Modal
                title='编辑'
                trigger={<Button>{translate('common.search')}</Button>}
                component={() => import('./edit')}
                componentProps={{ id: row.id }}
              ></Modal>
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
      tabs={[
        {
          label: '全部',
          value: '0',
        },
        {
          label: '已审核',
          value: '1',
        },
        {
          label: '未审核',
          value: '2',
        },
      ]}
      headerRender={() => {
        return (
          <>
            <Modal
              title='创建'
              trigger={<Button>创建</Button>}
              component={() => import('./create')}
            ></Modal>
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
          <Button>批量删除</Button>
        </>
      }
    />
  )
}
