import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth'

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    const dbUser = createUser(email, password)
    return
  }

  if (user) {
    const passwordMatch = bcrypt.compareSync(password, user.password ?? '')
    if (!passwordMatch) return null
    return user
  }
}

const createUser = async (email: string, password: string) => {
  if (!email || !password) return null

  const user = await prisma.user.create({
    data: {
      email: email,
      password: bcrypt.hashSync(password),
      name: email.split('@')[0]
    }
  })

  return user
}

export const getUserSessionServer = async () => {
  const session = await getServerSession(authOptions)
  return session?.user ? session.user : null
}
