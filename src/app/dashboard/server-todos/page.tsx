export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getUserSessionServer } from '@/auth/actions/auth-actions'
import prisma from '@/lib/prisma'
import { NewTodo, TodosGrid } from '@/todos'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Listado de Todos',
  description: 'Listado de Todos'
}

const ServerTodosPage = async () => {
  const user = await getUserSessionServer()

  if (!user) redirect('/api/auth/signin')

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: 'asc' }
  })
  return (
    <>
      <span className="text-3xl font-bold text-[#FFFFFF]">Server Actions</span>
      <div className="w-full flex justify-end items-center">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  )
}

export default ServerTodosPage
