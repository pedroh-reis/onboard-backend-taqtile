import {IResolvers} from "@graphql-tools/utils"
import {getRepository} from "typeorm"
import {User} from "./entity/User"
const resolverMap: IResolvers = {
    Query: {
        hello(_: void, args: void): string {
            return "Hello, world!"
        }
    },

    Mutation: {
        async createUser(_, args) {
            const userRepository = getRepository(User)

            let dbUser = await userRepository.findOne({email: args.input.email})
            if (dbUser) {
                throw new Error("ERROR: User already created.")
            }

            const user = new User()
            user.name = args.input.name
            user.email = args.input.email
            user.password = args.input.password
            user.birthDate = args.input.birthDate

            if (user.password.length < 7) {
                throw new Error("ERROR: Password should have at least 7 characters.")
            }

            const passwordRegex = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i
            if (!passwordRegex.test(user.password)) {
                throw new Error("ERROR: Weak password.")
            }

            dbUser = await userRepository.save(user)

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                birthDate: dbUser.birthDate
            }
        }
    }
}

export default resolverMap
