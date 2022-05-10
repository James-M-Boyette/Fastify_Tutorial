// console.log('Whazzap from Fastify_tutorial ...')

import Fastify from "fastify";
import userRoutes from "./modules/users/user.route";
import { userSchemas } from "./modules/users/user.schema";

const server = Fastify();
const port = 3000;

server.get('/healthcheck', async function(){
    // 16:38; Unlike Express, Fastify *doesn't* require you to call 'response' or use .send ... function(request, response) etc
    return {status: "OK"};
});

async function main() {
    for(const schema of userSchemas){
        server.addSchema(schema);
    };

    // Note: need to register schemas before routes, so we've added them above

    server.register(userRoutes, {prefix: 'api/users'});

    try {
        await server.listen(port, '0.0.0.0'); // '0.0.0.0' is a docker-specific addition, as it expects *this* to be the local host
        console.log(`Server ready at http://localhost:3000`);
    } catch(e) {
        console.error(e);
        process.exit(1);
    };
}

main();