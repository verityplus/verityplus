import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import type PrismaTypes from '@pothos/plugin-prisma/generated'
import { PrismaClient, Prisma } from '@prisma/client'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'

export const prisma = new PrismaClient()

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
  Context: {
    user?: { id: string; role: string }
  }
}>({
  plugins: [PrismaPlugin, SimpleObjectsPlugin],
  prisma: {
    client: prisma,
    dmmf: (Prisma as any).dmmf,
  },
})

// Initialize root types
builder.queryType({})
builder.mutationType({})
