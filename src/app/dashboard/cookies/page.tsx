import { TabBar } from '@/components'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Cookies Page',
  description: 'Cookies Page'
}

export const CookiesPage = () => {
  const cookieStore = cookies()
  const cookieTab = cookieStore.get('selectedTab')?.value || '1'

  const allCookies = cookieStore.getAll()

  return (
    <div className="grid items-center w-full p-5 grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5">
      <span className="text-3xl text-neutral-100">Tabs</span>
      <TabBar currentTab={+cookieTab} />
    </div>
  )
}

export default CookiesPage
