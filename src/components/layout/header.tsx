import { PropsWithChildren } from 'react'
import { useSetLocale } from '@refinedev/core'
import { Avatar, Dropdown, Button, DropdownOption, Radio } from 'tdesign-react'
import { TranslateIcon, SearchIcon } from 'tdesign-icons-react'
import { useAppStore } from '@/stores/app'

const User = () => {
  return (
    <>
      <Avatar image='https://tdesign.gtimg.com/site/avatar.jpg' shape='circle' />
      <div className='flex flex-col'>
        <div className='leading-4'>Admin</div>
        <div className='text-sm leading-4 text-placeholder'>Group Name</div>
      </div>
    </>
  )
}

const Lang = () => {
  const changeLanguage = useSetLocale()
  const options: DropdownOption[] = [
    {
      content: 'English',
      prefixIcon: <div>🇬🇧</div>,
    },
    {
      content: '中文',
      prefixIcon: <div>🇨🇳</div>,
    },
  ]
  console.log(options)
  return (
    <>
      <Dropdown
        options={options}
        onClick={(data) => {
          changeLanguage(data.value as string)
        }}
      >
        <Button variant='text' shape='circle'>
          <TranslateIcon />
        </Button>
      </Dropdown>
    </>
  )
}

const Dark = () => {
  const switchDark = useAppStore((state) => state.switchDark)
  const dark = useAppStore((state) => state.dark)
  return (
    <Radio.Group
      variant='default-filled'
      size='small'
      value={dark ? 'dark' : 'light'}
      onChange={() => {
        switchDark()
      }}
    >
      <Radio.Button value='light'>
        <div className='i-tabler:sun h-3 w-3 text-warning'></div>
      </Radio.Button>
      <Radio.Button value='dark'>
        <div className='i-tabler:moon h-3 w-3 text-primary'></div>
      </Radio.Button>
    </Radio.Group>
  )
}

const Item = ({ children }: PropsWithChildren) => {
  return <div className='flex cursor-pointer items-center gap-2 px-2'>{children}</div>
}

const Header = () => {
  return (
    <div className='fixed left-0 right-0 top-0 h-14 flex border-b border-gray-4 px-3 bg-container dark:border-gray-10'>
      <div className='flex items-center gap-2'>
        <div className='text-7 font-bold font-sans'>Dux</div>
      </div>
      <div className='flex flex-1 items-center justify-center'>
        <div className='h-8 max-w-50 w-full flex cursor-pointer border rounded px-2 text-sm transition-all bg-component hover:border hover:border-brand hover:bg-secondarycontainer'>
          <div className='flex flex-1 items-center text-placeholder'>Search...</div>
          <div className='flex items-center'>
            <SearchIcon size={16} />
          </div>
        </div>
      </div>
      <div className='flex items-center justify-end'>
        <Item>
          <Dark />
        </Item>
        <Item>
          <Lang />
        </Item>
        <Item>
          <User />
        </Item>
      </div>
    </div>
  )
}

export default Header
