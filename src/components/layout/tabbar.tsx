import {
  useLogout,
  useMenu,
  ITreeMenu,
  useGo,
  useGetToPath,
  useParsed,
  IResourceItem,
} from '@refinedev/core'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { Menu, MessagePlugin, Button, Popup } from 'tdesign-react/esm'
const { HeadMenu, MenuItem, SubMenu } = Menu
export const TabBar = () => {
  const { menuItems, defaultOpenKeys } = useMenu()
  const [active, setActive] = useState()
  const go = useGo()
  const getToPath = useGetToPath()

  const { resource, action, params } = useParsed<{ layout: string }>()

  console.log(resource, defaultOpenKeys)

  const menus = useMemo(() => {
    return [
      {
        label: 'Dashboard',
        icon: 'i-tabler:home',
        route: 'index',
      },
      {
        label: 'Blog',
        icon: 'i-tabler:basket',
        route: 'blog-posts',
      },
    ]
  }, [])
  return (
    <div>
      <div className='h-15 flex justify-between border-t bg-container border-component'>
        {menus.map((item, index) => (
          <TabBarItem
            key={index}
            name={item.label}
            icon={item.icon}
            onClick={() => {
              go({
                to: item.route,
              })
            }}
          />
        ))}
        <Popup
          trigger='click'
          showArrow
          content='这是一个弹出框'
          triggerElement={<TabBarItem name='more' icon={'i-tabler:dots'} />}
        ></Popup>
      </div>

      <div className='fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-black/50 p-10'>
        <div className='h-full w-full bg-container'>111</div>
      </div>
    </div>
  )
}

interface TabBarItemProps {
  name: string
  icon: string
  active?: boolean
  onClick?: () => void
}
const TabBarItem = ({ name, icon, active, onClick }: TabBarItemProps) => {
  return (
    <>
      <div
        className={clsx([
          'flex flex-1 flex-col items-center p-2 hover:text-brand',
          active ? 'text-brand' : '',
        ])}
        onClick={onClick}
      >
        <div className={clsx(['h-5 w-5', icon])}></div>
        <div className='text-sm'>{name}</div>
      </div>
    </>
  )
}
