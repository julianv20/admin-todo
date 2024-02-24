import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {
  await prisma.todo.deleteMany()

  const todo = await prisma.todo.createMany({
    data: [
      {
        description: 'Piedra del alma'
      },
      {
        description: 'Piedra del tiempo',
        complete: true
      },
      {
        description: 'Piedra del espacio'
      },
      {
        description: 'Piedra del poder'
      },
      {
        description: 'Piedra del realidad'
      }
    ]
  })
  console.log(todo)
  return NextResponse.json({
    msg: 'Seed'
  })
}
