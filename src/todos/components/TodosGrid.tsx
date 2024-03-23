'use client'

import { Todo } from '@prisma/client'
import { TodoItem } from '@/todos'
// import * as todosApi from '@/todos/helpers/todos'
import { useRouter } from 'next/navigation'
import { toggleTodo } from '../actions/todo-actions'

interface Props {
  todos?: Todo[]
}

export const TodosGrid = ({ todos = [] }: Props) => {
  const router = useRouter()
  // const toggleTodo = async (id: string, complete: boolean) => {
  //   const updateTodo = await todosApi.updateTodo(id, complete)
  //   router.refresh()
  //   return updateTodo
  // }

  return (
    <div className="grid w-full p-5 grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  )
}
