import React from 'react'
import { useNavigation, IResourceComponentsProps, useTranslate } from '@refinedev/core'
import { useForm } from '@refinedev/react-hook-form'

export const CategoryEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate()

  const { list } = useNavigation()

  const {
    refineCore: { onFinish, formLoading, queryResult },
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const categoriesData = queryResult?.data?.data

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>{translate('categories.titles.edit')}</h1>
        <div>
          <button
            onClick={() => {
              list('categories')
            }}
          >
            {translate('categories.titles.list')}
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onFinish)}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <label>
            <span style={{ marginRight: '8px' }}>{translate('categories.fields.id')}</span>
            <input
              disabled
              type='number'
              {...register('id', {
                required: 'This field is required',
                valueAsNumber: true,
              })}
            />
            <span style={{ color: 'red' }}>{(errors as any)?.id?.message as string}</span>
          </label>
          <label>
            <span style={{ marginRight: '8px' }}>{translate('categories.fields.title')}</span>
            <input
              type='text'
              {...register('title', {
                required: 'This field is required',
              })}
            />
            <span style={{ color: 'red' }}>{(errors as any)?.title?.message as string}</span>
          </label>
          <div>
            <input type='submit' value={translate('buttons.save')} />
          </div>
        </div>
      </form>
    </div>
  )
}
