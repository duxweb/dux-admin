import { useLogin } from '@refinedev/core'
import { Form, Input, Button } from '@duxweb/dux-ui'
import { FieldValues } from 'react-hook-form'

export const Login = () => {
  const { mutate: login } = useLogin()

  const onSubmit = (values: FieldValues) => {
    login(values, {
      onSuccess: (data) => {
        if (!data.success) {
          // handle error
          //MessagePlugin.error(data.error.message)
        }

        // handle success
      },
    })
  }

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-gray-100'>
      <div className='m-4 max-w-full w-120 rounded-lg bg-white p-6 shadow'>
        <div className='mb-4'>Welcome to Dux UI, Sign In to Continue.</div>
        <Form onSubmit={onSubmit}>
          <Form.Item name='username'>
            <Input clear placeholder='请输入账户名' />
          </Form.Item>
          <Form.Item name='password'>
            <Input clear placeholder='请输入密码' auto-complete='new-password' />
          </Form.Item>
          <Form.Item>
            <Button color='primary' htmlType='submit' block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
