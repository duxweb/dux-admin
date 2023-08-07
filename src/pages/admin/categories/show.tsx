import React from 'react'
import {
  useShow,
  useResource,
  useNavigation,
  IResourceComponentsProps,
  useTranslate,
} from '@refinedev/core'

export const CategoryShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate()
  const { edit, list } = useNavigation()
  const { id } = useResource()
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult

  const record = data?.data

  return (
    <div style={{ padding: '16px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1>{translate('categories.titles.show')}</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => list('categories')}>{translate('categories.titles.list')}</button>
          <button onClick={() => edit('categories', id ?? '')}>{translate('buttons.edit')}</button>
        </div>
      </div>
      <div>
        <div style={{ marginTop: '6px' }}>
          <h5>{translate('categories.fields.id')}</h5>
          <div>{record?.id ?? ''}</div>
        </div>
        <div style={{ marginTop: '6px' }}>
          <h5>{translate('categories.fields.title')}</h5>
          <div>{record?.title}</div>
        </div>
      </div>
    </div>
  )
}
