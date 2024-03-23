'use client'

import { FormEvent, useState } from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import * as todoApi from '../helpers/todos'
import { useRouter } from 'next/navigation'
import { addTodo, deleteCompleted } from '../actions/todo-actions'
import { useSession } from 'next-auth/react'

export const NewTodo = () => {
  const [description, setDescription] = useState('')
  const router = useRouter()
  const session = useSession()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (description.trim().length === 0) return
    // await addTodo(description, session.data?.user?.id ?? '')
    await todoApi.createTodo(description, session.data?.user?.id ?? '')
    router.refresh()
  }

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault()
    await deleteCompleted()
  }

  return (
    <form className="flex" onSubmit={onSubmit}>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="w-full ml-10 pl-3 pr-3 py-2 rounded-lg bg-[#1E2125] text-neutral-100 outline-none focus:outline-none transition-all"
        placeholder="¿Qué necesita ser hecho?"
      />

      <div className="flex gap-x-2">
        <button
          type="submit"
          className="flex items-center justify-center rounded  bg-[#6763FE] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6863fe85] transition-all"
        >
          Crear
        </button>

        {/* <span className="flex flex-1"></span> */}

        <button
          onClick={handleDelete}
          //TODO: onClick={ () => deleteCompleted() }
          type="button"
          className="flex items-center justify-center rounded  bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-all"
        >
          <IoTrashOutline className="w-5 h-5 " />
          Completadas
        </button>
      </div>
    </form>
  )
}
