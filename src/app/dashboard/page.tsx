import { WidgetItem } from '@/components'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Image from 'next/image'

const DashboardPage = async () => {
  const session = await getServerSession(authOptions)
  console.log(session)
  if (!session) {
    redirect('/api/auth/signin')
  }
  return (
    <div className="grid w-full p-5 grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-5">
      <WidgetItem title="Usuario conectado">
        <div className="flex gap-5 justify-center items-center">
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{session?.user?.name}</span>
            <span className="text-sm">{session?.user?.email}</span>
          </div>
          <Image
            src={(session?.user?.image as string) ?? ''}
            alt="Foto de perfil"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
      </WidgetItem>
    </div>
  )
}

export default DashboardPage
