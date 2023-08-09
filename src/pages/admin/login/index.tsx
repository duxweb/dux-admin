import { useLogin, useTranslate } from '@refinedev/core'
import { Form, Input, Button, SubmitContext, Alert } from 'tdesign-react/esm'
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-react'
import { useAppStore } from '../../../stores/app'
import { useState } from 'react'

const { FormItem } = Form

type LoginVariables = {
  username: string
  password: string
}

export const Login = () => {
  const { mutate: login } = useLogin<LoginVariables>({})
  const [loading, setLoading] = useState<boolean>()
  const [error, setError] = useState<string>()
  const switchDark = useAppStore((state) => state.switchDark)

  const translate = useTranslate()

  const onSubmit = (context: SubmitContext) => {
    if (context.validateResult === false) {
      setError(context.firstError || 'Please check the form')
    }
    setLoading(true)
    login(
      {
        ...context.fields,
        app: 'admin',
      },
      {
        onSuccess: (data) => {
          setLoading(false)
          if (!data.success) {
            setError(translate(data.error.message))
            return
          }
        },
        onError: (error) => {
          setLoading(false)
          setError(translate(error?.message))
        },
      }
    )
  }

  return (
    <div className='h-screen w-screen flex items-start justify-center text-secondary md:items-center'>
      <div className='relative m-4 max-w-180 w-full flex flex-row gap-12 overflow-hidden rounded-lg p-8 shadow bg-container'>
        <div
          className='tex absolute h-30 w-30 flex rotate-45 cursor-pointer items-end justify-center p-3 text-white bg-brand -right-15 -top-15 hover:bg-brand-hover'
          onClick={() => {
            switchDark()
          }}
        >
          <div className='i-tabler:sun h-5 w-5'></div>
        </div>
        <div className='hidden flex-1 md:block'>
          <img src='/public/images/login/banner.svg' className='h-full w-full' />
        </div>
        <div className='flex flex-1 flex-col'>
          <div className='mt-4 flex flex-col items-center justify-center'>
            <img src='/public/images/common/logo.svg' width={50} />
            <div className='mt-4 text-lg'>Dux Admin</div>
          </div>
          <Form
            statusIcon={true}
            onSubmit={onSubmit}
            colon={true}
            labelWidth={0}
            className='my-6'
            disabled={loading}
          >
            <FormItem name='username'>
              <Input
                size='large'
                clearable={true}
                prefixIcon={<DesktopIcon />}
                placeholder='请输入账户名'
              />
            </FormItem>
            <FormItem name='password'>
              <Input
                size='large'
                type='password'
                prefixIcon={<LockOnIcon />}
                clearable={true}
                placeholder='请输入密码'
                autocomplete='new-password'
              />
            </FormItem>
            {error && (
              <FormItem>
                <Alert className='w-full' theme='error' message={error} />
              </FormItem>
            )}
            <FormItem>
              <Button theme='primary' type='submit' block size='large' loading={loading}>
                登录
              </Button>
            </FormItem>
          </Form>
          <div className='text-center text-sm text-placeholder'>
            All rights reserved © duxweb 2023
          </div>
        </div>
      </div>
    </div>
  )
}
