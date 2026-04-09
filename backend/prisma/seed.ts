import { PrismaClient } from '@prisma/client'
import { AUTHORS, CATEGORIES, ARTICLES } from './mock'
import 'dotenv/config'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? '',
})
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  // 1. Seed Admin User
  await prisma.user.upsert({
    where: { username: 'admin_verity' },
    update: {},
    create: {
      username: 'admin_verity',
      email: 'admin@verityplus.com',
      password: 'password123', // In real app, hash this!
      role: 'admin',
    },
  })

  // 2. Seed Authors
  const authors = AUTHORS

  for (const author of authors) {
    await prisma.author.upsert({
      where: { id: author.id },
      update: {},
      create: author,
    })
  }

  // 3. Seed Categories
  const categories = CATEGORIES

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: {},
      create: cat,
    })
  }

  // 4. Seed Articles (Simplified sample)
  for (const article of ARTICLES) {
    const { author, category, tagsId, tagsEn, tagsZh, ...data } = article

    await prisma.article.upsert({
      where: { id: article.id },
      update: {},
      create: {
        ...data,
        authorId: author.id,
        categoryId: category.id,
        tagsId: JSON.stringify(tagsId),
        tagsEn: JSON.stringify(tagsEn),
        tagsZh: JSON.stringify(tagsZh),
      },
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
