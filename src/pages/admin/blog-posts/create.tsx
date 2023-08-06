import { Modal } from '@/components/modal'
import { Button } from 'tdesign-react/esm'

const BlogPostCreate = (props) => {
  console.log(props)
  return (
    <>
      <div className='p-4'>ddd</div>
      <Modal.Footer>
        <Button variant='outline'>取消</Button>
        <Button>确定</Button>
      </Modal.Footer>
    </>
  )
}

export default BlogPostCreate
