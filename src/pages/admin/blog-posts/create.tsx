import { FormModal } from '@/components/form'
import { Modal } from '@/components/modal'
import { Button, Form, Input } from 'tdesign-react/esm'

const BlogPostCreate = (props) => {
  console.log(props)
  return (
    <FormModal>
      <Form.FormItem label='标题' name='title'>
        <Input />
      </Form.FormItem>
    </FormModal>
  )
}

export default BlogPostCreate
