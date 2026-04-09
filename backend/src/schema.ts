import { builder, prisma } from './builder.js'
import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'

// --- Types ---

builder.prismaObject('Author', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    avatar: t.exposeString('avatar'),
    role: t.exposeString('role', { nullable: true }),
    bioId: t.exposeString('bioId'),
    bioEn: t.exposeString('bioEn'),
    bioZh: t.exposeString('bioZh'),
    articles: t.relation('articles'),
  }),
})

builder.prismaObject('Category', {
  fields: (t) => ({
    id: t.exposeID('id'),
    nameId: t.exposeString('nameId'),
    nameEn: t.exposeString('nameEn'),
    nameZh: t.exposeString('nameZh'),
    slug: t.exposeString('slug'),
    color: t.exposeString('color'),
    bgColor: t.exposeString('bgColor'),
    borderColor: t.exposeString('borderColor'),
    articles: t.relation('articles'),
  }),
})

builder.prismaObject('Article', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    slug: t.exposeString('slug'),
    titleId: t.exposeString('titleId'),
    titleEn: t.exposeString('titleEn'),
    titleZh: t.exposeString('titleZh'),
    excerptId: t.exposeString('excerptId'),
    excerptEn: t.exposeString('excerptEn'),
    excerptZh: t.exposeString('excerptZh'),
    contentId: t.exposeString('contentId'),
    contentEn: t.exposeString('contentEn'),
    contentZh: t.exposeString('contentZh'),
    coverImage: t.exposeString('coverImage'),
    coverImageCaptionId: t.exposeString('coverImageCaptionId'),
    coverImageCaptionEn: t.exposeString('coverImageCaptionEn'),
    coverImageCaptionZh: t.exposeString('coverImageCaptionZh'),
    publishedAt: t.exposeString('publishedAt'),
    readTimeMinutes: t.exposeInt('readTimeMinutes'),
    status: t.exposeString('status'),
    category: t.relation('category'),
    author: t.relation('author'),
    tagsId: t.exposeString('tagsId'),
    tagsEn: t.exposeString('tagsEn'),
    tagsZh: t.exposeString('tagsZh'),
  }),
})

const UserType = builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    username: t.exposeString('username'),
    email: t.exposeString('email'),
    role: t.exposeString('role'),
  }),
})

// --- Queries ---

builder.queryFields((t) => ({
  articles: t.prismaField({
    type: ['Article'],
    resolve: async (query, _root, _args, _ctx, _info) =>
      prisma.article.findMany({ ...query, orderBy: { createdAt: 'desc' } }),
  }),
  article: t.prismaField({
    type: 'Article',
    nullable: true,
    args: {
      slug: t.arg.string({ required: true }),
    },
    resolve: async (query, _root, args, _ctx, _info) =>
      prisma.article.findUnique({
        ...query,
        where: { slug: args.slug },
      }),
  }),
  categories: t.prismaField({
    type: ['Category'],
    resolve: async (query, _root, _args, _ctx, _info) => prisma.category.findMany({ ...query }),
  }),
  authors: t.prismaField({
    type: ['Author'],
    resolve: async (query, _root, _args, _ctx, _info) => prisma.author.findMany({ ...query }),
  }),
  me: t.prismaField({
    type: 'User',
    nullable: true,
    resolve: async (query, _root, _args, ctx, _info) => {
      if (!ctx.user) return null
      return prisma.user.findUnique({
        ...query,
        where: { id: ctx.user.id },
      })
    },
  }),
}))

// --- Mutations ---

builder.mutationFields((t) => ({
  login: t.field({
    type: builder.simpleObject('LoginResponse', {
      fields: (t) => ({
        token: t.string(),
        user: t.field({ type: UserType }),
      }),
    }),
    args: {
      username: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, _ctx) => {
      const user = await prisma.user.findUnique({
        where: { username: args.username },
      })

      if (!user || user.password !== args.password) {
        throw new GraphQLError('Invalid credentials')
      }

      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' })

      return { token, user }
    },
  }),

  // --- Articles ---
  createArticle: t.prismaField({
    type: 'Article',
    args: {
      titleId: t.arg.string({ required: true }),
      titleEn: t.arg.string({ required: true }),
      titleZh: t.arg.string({ required: true }),
      slug: t.arg.string({ required: true }),
      contentId: t.arg.string({ required: true }),
      contentEn: t.arg.string({ required: true }),
      contentZh: t.arg.string({ required: true }),
      categoryId: t.arg.string({ required: true }),
      authorId: t.arg.string({ required: true }),
      status: t.arg.string({ required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      if (!ctx.user) throw new GraphQLError('Unauthorized')
      return prisma.article.create({
        ...query,
        data: {
          ...args,
          excerptId: '',
          excerptEn: '',
          excerptZh: '',
          coverImage: '',
          coverImageCaptionId: '',
          coverImageCaptionEn: '',
          coverImageCaptionZh: '',
          publishedAt: new Date().toISOString(),
          readTimeMinutes: 5,
          tagsId: '',
          tagsEn: '',
          tagsZh: '',
        },
      })
    },
  }),

  updateArticle: t.prismaField({
    type: 'Article',
    args: {
      id: t.arg.int({ required: true }),
      titleId: t.arg.string({ required: true }),
      titleEn: t.arg.string({ required: true }),
      titleZh: t.arg.string({ required: true }),
      slug: t.arg.string({ required: true }),
      contentId: t.arg.string({ required: true }),
      contentEn: t.arg.string({ required: true }),
      contentZh: t.arg.string({ required: true }),
      categoryId: t.arg.string({ required: true }),
      authorId: t.arg.string({ required: true }),
      status: t.arg.string({ required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      if (!ctx.user) throw new GraphQLError('Unauthorized')
      const { id, ...data } = args
      return prisma.article.update({
        ...query,
        where: { id },
        data,
      })
    },
  }),

  deleteArticle: t.prismaField({
    type: 'Article',
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      if (!ctx.user) throw new GraphQLError('Unauthorized')
      return prisma.article.delete({
        ...query,
        where: { id: args.id },
      })
    },
  }),

  // --- Categories ---
  createCategory: t.prismaField({
    type: 'Category',
    args: {
      nameId: t.arg.string({ required: true }),
      nameEn: t.arg.string({ required: true }),
      nameZh: t.arg.string({ required: true }),
      slug: t.arg.string({ required: true }),
      color: t.arg.string({ required: true }),
      bgColor: t.arg.string({ required: true }),
      borderColor: t.arg.string({ required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      if (!ctx.user) throw new GraphQLError('Unauthorized')
      return prisma.category.create({ ...query, data: args })
    },
  }),

  updateCategory: t.prismaField({
    type: 'Category',
    args: {
      id: t.arg.string({ required: true }),
      nameId: t.arg.string({ required: true }),
      nameEn: t.arg.string({ required: true }),
      nameZh: t.arg.string({ required: true }),
      slug: t.arg.string({ required: true }),
      color: t.arg.string({ required: true }),
      bgColor: t.arg.string({ required: true }),
      borderColor: t.arg.string({ required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      if (!ctx.user) throw new GraphQLError('Unauthorized')
      const { id, ...data } = args
      return prisma.category.update({ ...query, where: { id }, data })
    },
  }),

  deleteCategory: t.prismaField({
    type: 'Category',
    args: { id: t.arg.string({ required: true }) },
    resolve: async (query, _root, args, ctx) => {
      if (!ctx.user) throw new GraphQLError('Unauthorized')
      return prisma.category.delete({ ...query, where: { id: args.id } })
    },
  }),

  // --- Authors ---
  createAuthor: t.prismaField({
    type: 'Author',
    args: {
      name: t.arg.string({ required: true }),
      avatar: t.arg.string({ required: true }),
      role: t.arg.string({ required: false }),
      bioId: t.arg.string({ required: true }),
      bioEn: t.arg.string({ required: true }),
      bioZh: t.arg.string({ required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      if (!ctx.user) throw new GraphQLError('Unauthorized')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return prisma.author.create({ ...query, data: args as any })
    },
  }),

  updateAuthor: t.prismaField({
    type: 'Author',
    args: {
      id: t.arg.string({ required: true }),
      name: t.arg.string({ required: true }),
      avatar: t.arg.string({ required: true }),
      role: t.arg.string({ required: false }),
      bioId: t.arg.string({ required: true }),
      bioEn: t.arg.string({ required: true }),
      bioZh: t.arg.string({ required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      if (!ctx.user) throw new GraphQLError('Unauthorized')
      const { id, ...data } = args
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return prisma.author.update({ ...query, where: { id }, data: data as any })
    },
  }),

  deleteAuthor: t.prismaField({
    type: 'Author',
    args: { id: t.arg.string({ required: true }) },
    resolve: async (query, _root, args, ctx) => {
      if (!ctx.user) throw new GraphQLError('Unauthorized')
      return prisma.author.delete({ ...query, where: { id: args.id } })
    },
  }),
}))

export const schema = builder.toSchema()
