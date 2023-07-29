import { useLogin } from '@refinedev/core'
import { Form, Input, Button, MessagePlugin, SubmitContext, Alert } from 'tdesign-react/esm'
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-react'
import { useAppStore } from '../../stores/app'
import { useState } from 'react'

const { FormItem } = Form

type LoginVariables = {
  username: string
  password: string
}

export const Login = () => {
  const { mutate: login } = useLogin<LoginVariables>()
  const [error, setError] = useState<string | undefined>(undefined)
  const switchDark = useAppStore((state) => state.switchDark)

  const onSubmit = (context: SubmitContext) => {
    if (context.validateResult === false) {
      setError(context.firstError || 'Please check the form')
    }

    login(context.fields, {
      onSuccess: (data) => {
        if (!data.success) {
          // handle error
          setError(data.error.message)
          return
        }

        // handle success
      },
    })
  }

  return (
    <div className='text-secondary h-screen w-screen flex items-start justify-center md:items-center'>
      <div className='bg-container relative m-4 max-w-180 w-full flex flex-row gap-12 overflow-hidden rounded-lg p-8 shadow'>
        <div
          className='bg-brand tex hover:bg-brand-hover absolute h-30 w-30 flex rotate-45 cursor-pointer items-end justify-center p-3 text-white -right-15 -top-15'
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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 202.97 197.7'
              className='fill-brand w-16'
            >
              <path d='M170,94.52l-35.9-20.73-24.34,14,11.62,6.71a5,5,0,0,1,0,8.66L32.5,154.52a5,5,0,0,1-7.5-4.33V99.61a6.44,6.44,0,0,1,0-1.52V47.51a5,5,0,0,1,7.5-4.33l35,20.23,24.32-14L7.5.68A5,5,0,0,0,0,5V192.69A5,5,0,0,0,7.5,197L170,103.18A5,5,0,0,0,170,94.52Z' />
              <path d='M32.93,103.18l35.9,20.73,24.34-14-11.62-6.71a5,5,0,0,1,0-8.66l88.92-51.34a5,5,0,0,1,7.5,4.33V98.09a6.44,6.44,0,0,1,0,1.52v50.58a5,5,0,0,1-7.5,4.33l-35-20.23-24.32,14L195.47,197a5,5,0,0,0,7.5-4.33V5a5,5,0,0,0-7.5-4.33L32.93,94.52A5,5,0,0,0,32.93,103.18Z' />
            </svg>
            <div className='mt-4 text-lg'>Dux Admin</div>
          </div>
          <Form statusIcon={true} onSubmit={onSubmit} colon={true} labelWidth={0} className='my-6'>
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
              <Button theme='primary' type='submit' block size='large'>
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
