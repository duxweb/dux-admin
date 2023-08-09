import { useMenu, useGo, useParsed } from '@refinedev/core'
import clsx from 'clsx'
import { useState } from 'react'
import { Button, Link } from 'tdesign-react/esm'
import { CloseIcon } from 'tdesign-icons-react'
import { TreeMenuItem } from '@refinedev/core/dist/hooks/menu/useMenu'
import { motion } from 'framer-motion'
import config from '@/config'

export const TabBar = () => {
  const go = useGo()
  const [open, setOpen] = useState(false)

  const { params } = useParsed<{ app: string }>()

  return (
    <>
      <div className='h-15 flex justify-between border-t bg-container border-component md:hidden'>
        {params &&
          config.tabBar[params.app]?.map((item, index) => (
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
        <TabBarItem
          name='more'
          icon={'i-tabler:dots'}
          onClick={() => {
            setOpen(!open)
          }}
        />
      </div>
      <div className='md:hidden'>{open && <Menu onClose={() => setOpen(false)} />}</div>
    </>
  )
}

interface MenuProps {
  onClose: () => void
  visible?: boolean
}
const Menu = ({ onClose }: MenuProps) => {
  const { menuItems, defaultOpenKeys } = useMenu()
  const [active, setActive] = useState<string[]>(defaultOpenKeys)
  return (
    <div
      className={clsx([
        'fixed inset-0 z-100  items-center justify-center overflow-hidden bg-black/50 p-10',
      ])}
    >
      <motion.div
        className='h-full w-full flex flex-col rounded-lg bg-white/50 p-4 backdrop-blur-sm dark:bg-black/80'
        animate={'show'}
        variants={{
          show: {
            opacity: 1,
          },
          hidden: {
            opacity: 0,
          },
        }}
      >
        <div className='flex flex-none flex-row items-center justify-between'>
          <div className='text-lg'>Menu</div>
          <div className=''>
            <Button shape='circle' icon={<CloseIcon />} variant='outline' onClick={onClose} />
          </div>
        </div>
        <ul className='flex flex-1 flex-col gap-2 py-4'>
          {menuItems.map((item, index) => {
            return (
              <CollapseMenu
                key={index}
                item={item}
                active={active}
                setActive={setActive}
                onClose={onClose}
              />
            )
          })}
        </ul>
      </motion.div>
    </div>
  )
}

interface CollapseMenuProps {
  item: TreeMenuItem
  active: string[]
  setActive: (active: string[]) => void
  onClose: () => void
}
const CollapseMenu = ({ item, active, setActive, onClose }: CollapseMenuProps) => {
  const go = useGo()
  const [collapse, setCollapse] = useState(active[active.length - 1] == item.key)
  return (
    <li>
      <div
        className='flex cursor-pointer items-center justify-between gap-2 rounded p-2 bg-container hover:text-brand'
        onClick={() => {
          item.children?.length > 0 && setCollapse(!collapse)
          if (!item.children?.length && item.route) {
            go({ to: item.route })
            setActive([item.key])
            onClose?.()
          }
        }}
      >
        <div className='flex items-center gap-2'>
          <div className='i-tabler:home'></div>
          {item.label}
        </div>
        {item.children?.length > 0 && (
          <div
            className={clsx([
              'i-tabler:chevron-down transition-all',
              collapse ? 'rotate-0' : '-rotate-90',
            ])}
          ></div>
        )}
      </div>
      <ul
        className={clsx([
          'transition-all overflow-hidden flex flex-col',
          collapse ? 'max-h-200' : 'max-h-0',
        ])}
      >
        {item.children?.map((parent: TreeMenuItem, index: number) => (
          <li key={index} className='py-1'>
            <div className='flex cursor-pointer items-center gap-2 rounded px-4 py-2 text-sm opacity-50'>
              {parent.label}
            </div>
            <ul className='flex flex-col rounded bg-white/50 divide-y divide-gray-4 dark:bg-white/5 dark:divide-black'>
              {parent.children?.map((sub: TreeMenuItem, key: number) => (
                <li key={key}>
                  <Link
                    className={clsx([
                      'block px-4 py-2',
                      active[active.length - 1] == item.key &&
                      active[active.length - 2] == parent.key &&
                      active[active.length - 3] == sub.key
                        ? 'text-brand'
                        : '',
                    ])}
                    hover={'color'}
                    onClick={() => {
                      go({
                        to: sub.route,
                      })
                      setActive([sub.key, parent.key, item.key])
                      onClose?.()
                    }}
                  >
                    {sub.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </li>
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
          'flex flex-1 flex-col items-center p-2 hover:text-brand cursor-pointer',
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
