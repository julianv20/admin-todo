// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { Sidebar, TopMenu } from '@/components'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Sidebar />
      <div className="bg-[#1E2329] ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen ">
        <TopMenu />
        <div className="flex flex-col justify-center p-5 m-5 rounded-lg bg-[#34383D]">
          {children}
        </div>
      </div>
    </>
  )
}
