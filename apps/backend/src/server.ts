import * as dotenv from "dotenv"
dotenv.config()

import "reflect-metadata"
import Fastify, { FastifyReply, FastifyRequest } from "fastify"
import { buildSchema } from "type-graphql"
import Container from "typedi"
import mercurius from "mercurius"
import { AuthResolver } from "./auth/auth.resolver"
import fastifyCors from "@fastify/cors"
import fastifyCookie from "@fastify/cookie"

async function main() {
  const app = Fastify()
  const schema = await buildSchema({
    resolvers: [AuthResolver],
    container: Container,
  })
  app.register(fastifyCors, {
    origin: ["http://localhost:3000"],
    credentials: true,
  })
  app.register(fastifyCookie)
  app.register(mercurius, {
    schema,
    jit: 1,
    ide: true,
    context: async (req: FastifyRequest, reply: FastifyReply) => {
      return {
        req,
        reply,
      }
    },
  })
  const url = await app.listen({ port: 4000 })
  console.log(`Server running at ${url}/graphiql`)
}

main().catch(console.error)
