import express from "express"
import {ApolloServer} from "apollo-server-express"
import depthLimit from "graphql-depth-limit"
import {createServer} from "http"
import compression from "compression"
import cors from "cors"
import schema from "./schema"

async function startExpressApolloServer() {
    const app = express()
    const server = new ApolloServer({
        schema,
        validationRules: [depthLimit(7)]
    })

    app.use(cors({
        origin: "*"
    }))
    app.use(compression())
    await server.start()
    server.applyMiddleware({
        app,
        path: "/graphql"
    })

    const httpServer = createServer(app)

    httpServer.listen(
        {port: 3000},
        (): void => console.log("GraphQL is now running on http://localhost:3000/graphql")
    )
}

startExpressApolloServer()