import { getUserSessionServer } from '@/auth/actions/auth-actions'
import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'

interface Segments {
  params: {
    id: string
  }
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const user = await getUserSessionServer()
  if (!user) {
    return null
  }

  const response = await prisma.todo.findUnique({
    where: {
      id: id
    }
  })

  if (!response) {
    return null
  }

  if (response.userId !== user.id) {
    return null
  }

  return response
}

export async function GET(request: Request, segments: Segments) {
  const { id } = segments.params

  try {
    const response = await getTodo(id)

    if (!response) {
      return NextResponse.json(
        {
          error: 'No existe esta tarea'
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      data: response
    })
  } catch (error) {
    console.log(error)
  }
}

const updateSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional()
})

export async function PUT(request: Request, segments: Segments) {
  const user = await getUserSessionServer()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = segments.params

  const response = await getTodo(id)

  if (!response) {
    return NextResponse.json(
      {
        error: 'El todo no existe'
      },
      { status: 404 }
    )
  }

  try {
    const { description, complete } = await updateSchema.validate(
      await request.json()
    )
    const updatedTodo = await prisma.todo.update({
      where: {
        id: id,
        userId: user.id
      },
      data: { description, complete }
    })

    return NextResponse.json({
      updatedTodo
    })
  } catch (error) {
    console.log(error)
  }
}
