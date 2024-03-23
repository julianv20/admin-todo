'use server'

import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const sleep = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
}

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  await sleep()
  const todo = await prisma.todo.findFirst({ where: { id } })
  if (!todo) throw `Todo con el ${id} no encontrado`

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete: complete }
  })
  revalidatePath('/dashboard/server-todos')
  return updatedTodo
}

export const addTodo = async (description: string, userId: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description, userId } })
    revalidatePath('/dashboard/server-todos')
    return todo
  } catch (error) {
    console.log(error)
  }
}

export const deleteCompleted = async () => {
  try {
    const todo = await prisma.todo.deleteMany({ where: { complete: true } })
    revalidatePath('/dashboard/server-todos')
    return todo
  } catch (error) {
    console.log(error)
  }
}
