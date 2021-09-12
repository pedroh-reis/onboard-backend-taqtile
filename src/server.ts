import express from "express"
import {ApolloServer} from "apollo-server-express"
import depthLimit from "graphql-depth-limit"
import {createServer} from "http"
import compression from "compression"
import cors from "cors"
import schema from "./schema"

import "reflect-metadata"
import {createConnection} from "typeorm"
import {User} from "./entity/User"

createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "localdb_username",
    password: "localdb_password",
    database: "localdb_name",
    entities: [__dirname + "/entity/*.js"],
    synchronize: true,
    logging: false
})
    .then(async (connection) => {
        const user = new User()
        user.firstName = "Pedro"
        user.lastName = "Reis"
        user.age = 22
        user.email = "pedro.reis@gmail.com"
        user.password = "12345678"

        await connection.manager.save(user)

        const savedUsers = await connection.manager.find(User)
        console.log("All users from the db: ", savedUsers)
    })
    .catch((error) => console.log(error))

async function startExpressApolloServer() {
    const app = express()
    const server = new ApolloServer({
        schema,
        validationRules: [depthLimit(7)]
    })

    app.use(
        cors({
            origin: "*"
        })
    )
    app.use(compression())
    await server.start()
    server.applyMiddleware({
        app,
        path: "/graphql"
    })

    const httpServer = createServer(app)

    httpServer.listen({port: 3000}, (): void => console.log("GraphQL is now running on http://localhost:3000/graphql"))
}

startExpressApolloServer()
