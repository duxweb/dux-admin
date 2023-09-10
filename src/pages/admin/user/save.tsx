import { useTranslate } from '@refinedev/core'
import {
  FormModal,
  useUpload,
  useSelect,
  formatUploadSingle,
  getUploadSingle,
} from '@duxweb/dux-refine'
import { Form, Input, Upload, Select } from 'tdesign-react/esm'

const Page = (props: Record<string, any>) => {
  const translate = useTranslate()
  const uploadParams = useUpload()

  const { options, onSearch } = useSelect({
    resource: 'role',
    optionLabel: 'name',
    optionValue: 'id',
  })

  return (
    <FormModal
      id={props?.id}
      initFormat={(data) => {
        data.image = formatUploadSingle(data.image)
        return data
      }}
      saveFormat={(data) => {
        data.image = getUploadSingle(data.image)
        return data
      }}
    >
      <Form.FormItem label={translate('user.fields.role')} name='role_id'>
        <Select filterable onSearch={onSearch} options={options} />
      </Form.FormItem>
      <Form.FormItem label={translate('user.fields.username')} name='username'>
        <Input />
      </Form.FormItem>
      <Form.FormItem label={translate('user.fields.nickname')} name='nickname'>
        <Input />
      </Form.FormItem>
      <Form.FormItem label={translate('user.fields.avatar')} name='avatar'>
        <Upload {...uploadParams} theme='image' accept='image/*' />
      </Form.FormItem>
      <Form.FormItem label={translate('user.fields.password')} name='password'>
        <Input type='password' autocomplete='new-password' />
      </Form.FormItem>
    </FormModal>
  )
}

export default Page
