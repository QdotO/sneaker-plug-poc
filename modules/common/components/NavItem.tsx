import Link from 'next/link'
import React, { useState } from 'react'
import MinusIcon from '../icons/MinusIcon'
import PlusIcon from '../icons/PlusIcon'

type Props = {
  item: {
    name: string
    href: string
    icon: React.ReactNode
    subItems?: {
      name: string
      href: string
    }[]
  }
}

const NavItem = ({ item }: Props) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <li className='p-4 text-lg text-gray-800 font-bold w-full' key={item.name}>
      <div className='flex flex-col'>
        <div className='flex justify-between'>
          <div className='flex'>
            <span className='mr-4'>{item.icon}</span>
            <Link href={item.href}>{item.name}</Link>
          </div>
          {item.subItems && (
            <button
              type='button'
              className='w-8 h-8 border-none'
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <MinusIcon /> : <PlusIcon />}
            </button>
          )}
        </div>
        {expanded && item.subItems && (
          <ul className='flex flex-col'>
            {item.subItems &&
              item.subItems.map((subItem) => (
                <li className='p-4 text-lg text-gray-800 font-bold'>
                  <Link href={subItem.href}>{subItem.name}</Link>
                </li>
              ))}
          </ul>
        )}
      </div>
    </li>
  )
}

export default NavItem
