import React from 'react'
import HomeIcon from '../icons/HomeIcon'
import OrdersIcon from '../icons/OrdersIcon'
import SneakerIcon from '../icons/SneakerIcon'
import UserIcon from '../icons/UserIcon'
import NavItem from './NavItem'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: <HomeIcon /> },
  {
    name: 'Sneakers',
    href: '/admin/sneakers',
    icon: <SneakerIcon />,
    subItems: [{ name: 'Create', href: '/admin/sneakers/add' }]
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: <UserIcon />,
    subItems: [{ name: 'Create', href: '/admin/users/create' }]
  },
  { name: 'Orders', href: '/admin/orders', icon: <OrdersIcon /> }
]

type Props = {}

const Aside = (props: Props) => {
  return (
    <div className='hidden md:block lg:w-1/6 bg-gray-200 min-h-full shadow-md'>
      <nav className='flex flex-col items-stretch'>
        <ul>
          {navItems.map((item) => (
            <NavItem item={item} key={item.name} />
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Aside
