import {IResolvers} from "@graphql-tools/utils"
const resolverMap: IResolvers = {
    Query: {
        hello(_: void, args: void): string {
            return "Hello, world!"
        }
    },

    Mutation: {
        createUser(_, args) {
            return {
                id: 123,
                name: args.input.name,
                email: args.input.email,
                birthDate: args.input.birthDate
            }
        }
    }
}

export default resolverMap
