import { useLogin } from '@refinedev/core'
import { Form, Input, Button, MessagePlugin, SubmitContext } from 'tdesign-react'
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-react'

const { FormItem } = Form

type LoginVariables = {
  username: string
  password: string
}

export const Login = () => {
  const { mutate: login } = useLogin<LoginVariables>()

  const onSubmit = (context: SubmitContext) => {
    if (context.validateResult === false) {
      MessagePlugin.error('提交失败')
    }

    login(context.fields, {
      onSuccess: (data) => {
        if (!data.success) {
          // handle error
          MessagePlugin.error(data.error.message)
        }

        // handle success
      },
    })
  }

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-gray-100'>
      <div className='m-4 max-w-full w-120 rounded-lg bg-white p-6 shadow'>
        <div className='mb-4'>Welcome to Dux UI, Sign In to Continue.</div>
        <Form statusIcon={true} onSubmit={onSubmit} colon={true} labelWidth={0}>
          <FormItem name='username'>
            <Input clearable={true} prefixIcon={<DesktopIcon />} placeholder='请输入账户名' />
          </FormItem>
          <FormItem name='password'>
            <Input
              type='password'
              prefixIcon={<LockOnIcon />}
              clearable={true}
              placeholder='请输入密码'
              autocomplete='new-password'
            />
          </FormItem>
          <FormItem>
            <Button theme='primary' type='submit' block>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  )
}
