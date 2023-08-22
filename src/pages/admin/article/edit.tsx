import { FormModal, Modal } from '@duxweb/dux-refine'
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
