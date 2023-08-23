import React, { useRef } from 'react'
import { useNavigation, useTranslate } from '@refinedev/core'
import { PrimaryTableCol, Button, Input, Tag } from 'tdesign-react/esm'
import { PageTable, FilterItem, CardTableRef, Modal } from '@duxweb/dux-refine'

const List = () => {
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
        title: 'ID',
        width: 100,
      },
      {
        colKey: 'title',
        title: translate('articles.fields.title'),
        minWidth: 200,
      },
      {
        colKey: 'status',
        title: translate('articles.fields.status'),
        width: 150,
        filter: {
          type: 'single',
          list: [
            { label: translate('articles.tab.all'), value: '0' },
            { label: translate('articles.tab.published'), value: '1' },
            { label: translate('articles.tab.unpublished'), value: '2' },
          ],
        },
        cell: ({ row }) => {
          return (
            <>
              {row.status ? (
                <Tag theme='warning' variant='outline'>
                  {translate('articles.tab.published')}
                </Tag>
              ) : (
                <Tag theme='success' variant='outline'>
                  {translate('articles.tab.unpublished')}
                </Tag>
              )}
            </>
          )
        },
      },
      {
        colKey: 'createdAt',
        title: translate('articles.fields.createdAt'),
        sorter: true,
        sortType: 'all',
        width: 200,
        cell: ({ row }) => {
          return new Date(row.create_at).toLocaleString(undefined, {
            timeZone: 'UTC',
          })
        },
      },
      {
        colKey: 'link',
        title: translate('table.actions'),
        fixed: 'right',
        align: 'center',
        width: 120,
        cell: ({ row }) => {
          return (
            <div className='flex justify-center gap-2'>
              <Modal
                title={translate('buttons.edit')}
                trigger={<Button>{translate('buttons.edit')}</Button>}
                component={() => import('./edit')}
                componentProps={{ id: row.id }}
              />
            </div>
          )
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [translate]
  )

  return (
    <PageTable
      ref={table}
      columns={columns}
      title={translate('blog_posts.fields.title')}
      tabs={[
        {
          label: translate('articles.tab.all'),
          value: '0',
        },
        {
          label: translate('articles.tab.published'),
          value: '1',
        },
        {
          label: translate('articles.tab.unpublished'),
          value: '2',
        },
      ]}
      headerRender={() => {
        return (
          <>
            <Modal
              title={translate('buttons.edit')}
              trigger={<Button>{translate('buttons.create')}</Button>}
              component={() => import('./create')}
            ></Modal>
          </>
        )
      }}
      filterRender={() => {
        return (
          <>
            <FilterItem name='keyword'>
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

export default List
