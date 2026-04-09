import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import type PrismaTypes from '@pothos/plugin-prisma/generated'
import { PrismaClient, Prisma } from '@prisma/client'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'
import 'dotenv/config'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? '',
})

export const prisma = new PrismaClient({ adapter })

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
  Context: {
    user?: { id: string; role: string }
  }
}>({
  plugins: [PrismaPlugin, SimpleObjectsPlugin],
  prisma: {
    client: prisma,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dmmf: (Prisma as any).dmmf,
  },
})

// Initialize root types
builder.queryType({})
builder.mutationType({})
