import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import type PrismaTypes from '../src/generated/pothos-types.js'
import { PrismaClient } from '@prisma/client'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'
import 'dotenv/config'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { getDatamodel } from '../src/generated/pothos-types.js'

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

    dmmf: getDatamodel(),
  },
})

// Initialize root types
builder.queryType({})
builder.mutationType({})
