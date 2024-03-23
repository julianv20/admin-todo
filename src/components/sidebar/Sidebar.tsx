import Image from 'next/image'
import Link from 'next/link'
import { CiLogout } from 'react-icons/ci'
import { LogoutBottom, SidebarItem } from '..'
import {
  IoBackspaceOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonAddOutline,
  IoPersonOutline
} from 'react-icons/io5'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const menuItems = [
  { icon: <IoCalendarOutline />, title: 'Dashbaord', path: '/dashboard' },
  {
    icon: <IoCheckboxOutline />,
    title: 'Rest TODOS',
    path: '/dashboard/rest-todos'
  },
  {
    icon: <IoListOutline />,
    title: 'Server Actions',
    path: '/dashboard/server-todos'
  },
  {
    icon: <IoCodeWorkingOutline />,
    title: 'Cookies',
    path: '/dashboard/cookies'
  },
  {
    icon: <IoBackspaceOutline />,
    title: 'Products',
    path: '/dashboard/products'
  },
  {
    icon: <IoPersonOutline />,
    title: 'Profile',
    path: '/dashboard/profile'
  }
]

export const Sidebar = async () => {
  const session = await getServerSession(authOptions)

  const userName = (session?.user?.name as string) ?? ''
  const image = (session?.user?.image as string) ?? ''
  const role = (session?.user?.roles as string[]) ?? ['user']

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen  transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] bg-[#303439] border border-[#131518]">
      <div className="flex flex-col h-full justify-start">
        <div className="mt-8 text-center">
          {/* Next/Image */}
          <Image
            src={image ? image : ''}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={200}
            height={200}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-neutral-100 lg:block">
            {userName ? userName : 'XXXXX'}
          </h5>
          <span className="hidden text-neutral-100 lg:block">
            {role.join(',')}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map(({ icon, title, path }) => (
            <SidebarItem key={path} icon={icon} title={title} path={path} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutBottom />
      </div>
    </aside>
  )
}
