import { PropsWithChildren } from 'react'
import { Menu } from '../menu'
import Header from './header'
import Sider from './sider'
import { Main } from '../main/main'
import { TabBar } from './tabbar'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='inset-0 h-screen w-screen flex flex-row overflow-hidden'>
      <Sider />

      <div className='w-1 flex flex-1 flex-col'>
        <Header />
        <div className='flex-1 overflow-auto'>{children}</div>
        <TabBar />
      </div>
    </div>
  )
}
