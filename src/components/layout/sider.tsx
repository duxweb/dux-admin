import clsx from 'clsx'
import { Tooltip } from 'tdesign-react'

interface MenuItemProps {
  name: string
  icon: string
  active?: boolean
}
const MenuItem = ({ name, icon, active }: MenuItemProps) => {
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
            'flex items-center justify-center rounded px-2.5 py-1.5 hover:bg-brand-1',
            active ? 'bg-brand text-white hover:bg-brand hover:text-white' : '',
          ])}
        >
          <div className={clsx(['h-5 w-5', icon])}></div>
        </div>
      </Tooltip>
    </li>
  )
}

const Sider = () => {
  return (
    <div className='fixed bottom-0 left-0 top-14 w-16 flex flex-none flex-col border-r border-gray-4 bg-container'>
      <ul className='mt-10 flex flex-1 flex-col items-center gap-3 p-2 text-secondary'>
        <MenuItem name='Home' icon='i-tabler:home' active />
        <MenuItem name='Home' icon='i-tabler:message-circle-2' />
        <MenuItem name='Home' icon='i-tabler:brand-telegram' />
        <MenuItem name='Home' icon='i-tabler:basket' />
        <MenuItem name='Home' icon='i-tabler:users' />
        <MenuItem name='Home' icon='i-tabler:adjustments-alt' />
      </ul>
      <div className='mb-2 flex flex-none'>
        <ul className='flex flex-1 flex-col items-center gap-3 p-2 text-secondary'>
          <MenuItem name='Home' icon='i-tabler:logout-2' />
        </ul>
      </div>
    </div>
  )
}

export default Sider
