'use client'

import { useSession } from 'next-auth/react'

export default function ProfilePage() {
  const { data: session } = useSession()
  return (
    <div>
      <h1 className="text-2xl font-black text-neutral-100">Profile</h1>
      <p className="text-neutral-100 text-sm font-semibold">
        Welcome {session?.user?.name ?? 'Not found'}
      </p>
      <p className="text-neutral-100 text-sm font-semibold">
        Email: {session?.user?.email ?? 'Not found'}
      </p>
      <p className="text-neutral-100 text-sm font-semibold">
        Image: {session?.user?.image ?? 'Not found'}
      </p>
      {JSON.stringify(session, null, 2)}
    </div>
  )
}
