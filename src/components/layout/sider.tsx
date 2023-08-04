import clsx from 'clsx'
import { Tooltip } from 'tdesign-react'
import { useLogout, useMenu, ITreeMenu, useGo } from '@refinedev/core'
import { useCallback, useMemo, useState } from 'react'
import { TreeMenuItem } from '@refinedev/core/dist/hooks/menu/useMenu'
import { Menu, MessagePlugin, Button } from 'tdesign-react'
const { HeadMenu, MenuItem, SubMenu } = Menu

interface MenuAppProps {
  name: string
  icon: string
  active?: boolean
  onClick?: () => void
}
const MenuApp = ({ name, icon, active, onClick }: MenuAppProps) => {
  return (
    <li>
      <Tooltip
        content={name}
        destroyOnClose
        duration={0}
        placement='right'
        showArrow
        theme='default'
      >
        <div
          className={clsx([
            'flex items-center justify-center rounded px-2.5 py-1.5 hover:bg-brand-1 cursor-pointer',
            active ? 'bg-brand text-white hover:bg-brand hover:text-white' : '',
          ])}
          onClick={onClick}
        >
          <div className={clsx(['h-5 w-5', icon])}></div>
        </div>
      </Tooltip>
    </li>
  )
}

interface CollapseMenuProps {
  item: TreeMenuItem
  children?: React.ReactNode
}
const CollapseMenu = ({ item, children }: CollapseMenuProps) => {
  const [collapse, setCollapse] = useState(true)
  return (
    <div className='my-4 px-2 text-sm'>
      <div
        className='mb-1 flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-secondarycontainer'
        onClick={() => {
          setCollapse((status) => !status)
        }}
      >
        <div className={clsx(['w-4 h-4', item.icon])}></div>
        <div className='flex-1'>{item.label}</div>
        <div>
          <div
            className={clsx([
              'i-tabler:chevron-down transition-all',
              collapse ? 'rotate-0' : '-rotate-90',
            ])}
          ></div>
        </div>
      </div>
      <div className={clsx(['transition-all overflow-hidden', collapse ? 'max-h-200' : 'max-h-0'])}>
        {children}
      </div>
    </div>
  )
}

const Sider = () => {
  const { menuItems, defaultOpenKeys } = useMenu()
  const go = useGo()

  const [active, setActive] = useState<string[]>(defaultOpenKeys)
  const [collapse, setCollapse] = useState(true)

  const menuInfo = useMemo<TreeMenuItem>(() => {
    return menuItems.find((item) => active[active.length - 1] == item.key)
  }, [active, menuItems])

  console.log(menuInfo)

  return (
    <div className='z-1 flex flex-none flex-row'>
      <div className='h-screen w-18 flex flex-col border-r bg-container border-component'>
        <div className='h-14 flex items-center justify-center gap-2'>
          <div className='text-5 font-bold font-sans'>Dux</div>
        </div>
        <ul className='mt-6 flex flex-1 flex-col items-center gap-3 p-2 text-secondary'>
          {menuItems.map((item, index) => {
            return (
              <MenuApp
                key={index}
                name={item.label}
                icon={item.icon}
                active={active[active.length - 1] == item.key}
                onClick={() => {
                  if (active[active.length - 1] !== item.key) {
                    setActive([item.key])
                    setCollapse(true)
                  } else {
                    setCollapse((status) => !status)
                  }
                  if (item.route) {
                    go({
                      to: item.route,
                    })
                  }
                }}
              />
            )
          })}
        </ul>
        <div className='mb-2 flex flex-none'>
          <ul className='flex flex-1 flex-col items-center gap-3 p-2 text-secondary'>
            <MenuApp name='Home' icon='i-tabler:logout-2' />
          </ul>
        </div>
      </div>
      {menuInfo && (
        <div
          className={clsx([
            'border-component h-screen flex flex-col transition-all bg-container',
            collapse && menuInfo?.children?.length > 0
              ? 'w-45 opacity-100 border-r'
              : 'w-0 opacity-0 border-none',
          ])}
        >
          <div className='h-14 flex items-center px-4'>
            {menuInfo?.meta?.element || (
              <div className='font-bold text-secondary'>{menuInfo?.label}</div>
            )}
          </div>
          {menuInfo?.children?.map((item: TreeMenuItem, index: number) => (
            <CollapseMenu key={index} item={item}>
              {item?.children?.length > 0 && (
                <ul className='flex flex-col'>
                  {item.children.map((sub: TreeMenuItem, key: number) => (
                    <li key={key}>
                      <div
                        className={clsx([
                          'cursor-pointer rounded pr-2 pl-8 py-2',
                          active[active.length - 1] == menuInfo.key &&
                          active[active.length - 2] == item.key &&
                          active[active.length - 3] == sub.key
                            ? 'text-brand bg-brand-1'
                            : 'text-secondary hover:bg-secondarycontainer',
                        ])}
                        onClick={() => {
                          setActive([sub.key, item.key, menuInfo.key])
                          go({
                            to: sub.route,
                          })
                        }}
                      >
                        {sub.label}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CollapseMenu>
          ))}
        </div>
      )}
    </div>
  )
}

export default Sider
