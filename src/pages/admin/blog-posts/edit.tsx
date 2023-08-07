import { FormModal } from '@/components/form'
import { Modal } from '@/components/modal'
import { Button, Form, Input } from 'tdesign-react/esm'

const BlogPostEdit = (props) => {
  console.log(props)
  return (
    <FormModal action='edit' id={props.id} params={{ test: 'xxx' }}>
      <Form.FormItem label='标题' name='title'>
        <Input />
      </Form.FormItem>
    </FormModal>
  )
}
export default BlogPostEdit
