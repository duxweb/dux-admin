import { FormModal } from '@/components/form'
import { Modal } from '@/components/modal'
import { formatUploadFile, useUpload } from '@/components/upload/useUpload'
import config from '@/config'
import { getToken } from '@/provider/dataProvider'
import { useApiUrl, useGetIdentity } from '@refinedev/core'
import { Button, Form, Input, Upload, TdUploadProps } from 'tdesign-react/esm'

const BlogPostCreate = (props) => {
  const uploadParams = useUpload()

  return (
    <FormModal>
      <Form.FormItem label='标题' name='title'>
        <Input />
      </Form.FormItem>
      <Form.FormItem
        label='封面图'
        name='images'
        initialData={formatUploadFile('https://picsum.photos/id/124/200/200')}
      >
        <Upload
          {...uploadParams}
          theme='image'
          tips='请选择单张图片文件上传（上传成功状态演示）'
          accept='image/*'
          locale={{
            triggerUploadText: {
              image: '请选择图片',
            },
          }}
        />
      </Form.FormItem>

      <Form.FormItem label='多图片' name='images'>
        <Upload
          {...uploadParams}
          theme='image'
          multiple
          max={3}
          tips='请选择单张图片文件上传（上传成功状态演示）'
          accept='image/*'
          locale={{
            triggerUploadText: {
              image: '请选择图片',
            },
          }}
        />
      </Form.FormItem>
    </FormModal>
  )
}

export default BlogPostCreate
