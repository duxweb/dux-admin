import { PropsWithChildren } from 'react'
import { Menu } from '../menu'
import Header from './header'
import Sider from './sider'
import { Main } from '../main/main'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='pl-16 pt-14'>
      <Header />
      <Sider />
      <div>{children}</div>
    </div>
    // <div className='layout'>
    //   <Menu />
    //   <div className='content'>
    //     <Breadcrumb />
    //     <div>{children}</div>
    //   </div>
    // </div>
  )
}
