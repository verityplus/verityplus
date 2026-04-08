import { createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import { schema } from './schema.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'

const yoga = createYoga({
  schema,
  cors: {
    origin: '*', // For development. Change to specific domain in production.
    methods: ['POST'],
  },
  context: async ({ request }) => {
    const auth = request.headers.get('authorization')
    if (auth && auth.startsWith('Bearer ')) {
      const token = auth.split(' ')[1]
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string }
        return { user: decoded }
      } catch (err) {
        // Token invalid or expired
      }
    }
    return {}
  },
})

const server = createServer(yoga)

const PORT = 4000
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`)
})
