import { FastifyInstance } from "fastify";
import { registerUserHandler } from "./user.controller";
import { $ref } from "./user.schema";


async function userRoutes(server: FastifyInstance){
    server.post('/', {
        schema:{
            body: $ref('createUserSchema'),
            response:{
                201: $ref('createUserResponseSchema')
            }
        }
    }, registerUserHandler) // 19:00; Note that this isn't /users/create etc bc we've prefixed it with "api/users" in app.ts
}

export default userRoutes