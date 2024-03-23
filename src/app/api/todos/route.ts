import { getUserSessionServer } from '@/auth/actions/auth-actions'
import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'

export async function GET(request: Request) {
  const user = await getUserSessionServer()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)

  const take = Number(searchParams.get('take') ?? '10')
  const skip = Number(searchParams.get('skip') ?? '0')

  if (isNaN(take) || isNaN(skip)) {
    return NextResponse.json(
      { error: 'Invalid take or invalid skip' },
      { status: 400 }
    )
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
    where: { userId: user.id }
  })
  return NextResponse.json(todos)
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false)
})

export async function POST(request: Request) {
  const user = await getUserSessionServer()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { complete, description } = await postSchema.validate(
      await request.json()
    )

    const todo = await prisma.todo.create({
      data: { complete, description, userId: user.id ?? '' }
    })

    return NextResponse.json(todo)
  } catch (error) {
    return NextResponse.json(error.errors, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  const user = await getUserSessionServer()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const deleteTodos = await prisma.todo.deleteMany({
      where: {
        complete: true,
        userId: user.id
      }
    })
    if (deleteTodos.count === 0) {
      return NextResponse.json({ message: 'No todos to delete' })
    }
    return NextResponse.json(deleteTodos)
  } catch (error) {
    return NextResponse.json(error.errors, { status: 400 })
  }
}
