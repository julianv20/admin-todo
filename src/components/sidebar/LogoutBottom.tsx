'use client'

import { useSession, signOut, signIn } from 'next-auth/react'
import { CiLogout } from 'react-icons/ci'
import { IoShieldHalfOutline } from 'react-icons/io5'

export const LogoutBottom = () => {
  const { data: sesion, status } = useSession()

  if (status === 'loading') {
    return (
      <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <IoShieldHalfOutline />
        <span className="group-hover:text-gray-700">Espere...</span>
      </button>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <button
        onClick={() => signIn()}
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
      >
        <IoShieldHalfOutline />
        <span className="group-hover:text-gray-700">
          Ingresar a la aplicacion...
        </span>
      </button>
    )
  }

  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
    >
      <CiLogout />
      <span className="group-hover:text-gray-700">Logout</span>
    </button>
  )
}
