import { PropsWithChildren } from 'react'
import { Breadcrumb } from '../breadcrumb'
import { Button } from 'tdesign-react/esm'

export const MainHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='mb-4 flex items-center justify-between'>
      <Breadcrumb />
      <div>{children}</div>
    </div>
  )
}