import React, { useRef } from 'react'
import { useTranslate, useDelete } from '@refinedev/core'
import { PrimaryTableCol, Button, Input, Link, Popconfirm } from 'tdesign-react/esm'
import { MoveIcon } from 'tdesign-icons-react'
import { PageTable, FilterItem, CardTableRef, Modal } from '@duxweb/dux-refine'

const List = () => {
  const translate = useTranslate()
  const { mutate } = useDelete()

  const table = useRef<CardTableRef>(null)

  const columns = React.useMemo<PrimaryTableCol[]>(
    () => [
      { colKey: 'row-select', type: 'multiple' },
      {
        colKey: 'drag',
        title: '排序',
        cell: () => <MoveIcon />,
        width: 46,
        align: 'center',
      },
      {
        colKey: 'id',
        sorter: true,
        sortType: 'all',
        title: 'ID',
        width: 150,
      },
      {
        colKey: 'name',
        title: translate('categorys.fields.name'),
        ellipsis: true,
      },
      {
        colKey: 'created_at',
        title: translate('articles.fields.createdAt'),
        sorter: true,
        sortType: 'all',
        width: 200,
        cell: ({ row }) => {
          return new Date(row.created_at).toLocaleString(undefined, {
            timeZone: 'UTC',
          })
        },
      },
      {
        colKey: 'link',
        title: translate('table.actions'),
        fixed: 'right',
        align: 'center',
        width: 200,
        cell: ({ row }) => {
          return (
            <div className='flex justify-center gap-4'>
              <Modal
                title={translate('buttons.edit')}
                trigger={<Link theme='primary'>{translate('buttons.edit')}</Link>}
                component={() => import('./save')}
                componentProps={{ id: row.id }}
              />
              <Popconfirm
                content='确认删除吗'
                destroyOnClose
                placement='top'
                showArrow
                theme='default'
                onConfirm={() => {
                  mutate({
                    resource: 'article',
                    id: row.id,
                  })
                }}
              >
                <Link theme='danger'>{translate('buttons.delete')}</Link>
              </Popconfirm>
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
      table={{
        rowKey: 'id',
        tree: { childrenKey: 'children', treeNodeColumnIndex: 2, defaultExpandAll: true },
        pagination: undefined,
      }}
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
              title={translate('buttons.create')}
              trigger={<Button>{translate('buttons.create')}</Button>}
              component={() => import('./save')}
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
