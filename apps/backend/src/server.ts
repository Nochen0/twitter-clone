import * as dotenv from "dotenv"
dotenv.config()

import "reflect-metadata"
import Fastify from "fastify"
import { buildSchema } from "type-graphql"
import Container from "typedi"
import mercurius from "mercurius"
import { AuthResolver } from "./auth/auth.resolver"

async function main() {
  const app = Fastify()
  const schema = await buildSchema({
    resolvers: [AuthResolver],
    container: Container,
  })
  app.register(mercurius, {
    schema,
    jit: 1,
    ide: true,
  })
  const url = await app.listen({ port: 4000 })
  console.log(`Server running at ${url}/graphiql`)
}

main().catch(console.error)
