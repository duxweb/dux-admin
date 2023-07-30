import { useLogout, useMenu, ITreeMenu } from '@refinedev/core'
import { NavLink } from 'react-router-dom'

export const Menu = () => {
  const { mutate: logout } = useLogout()
  const { menuItems } = useMenu()

  const components = (menuItems: ITreeMenu[]) => {
    return (
      <>
        {menuItems.map((item) => {
          return (
            <li key={item.key}>
              <NavLink to={item.route}>{item.label}</NavLink>
              {item.children && <ul>{components(item.children)}</ul>}
            </li>
          )
        })}
      </>
    )
  }

  return (
    <nav className='menu'>
      <ul>{components(menuItems)}</ul>
      <button onClick={() => logout()}>Logout</button>
    </nav>
  )
}
