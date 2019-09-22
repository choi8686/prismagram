import "./env";
import {
    GraphQLServer
} from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

import {authenticateJwt} from "./passport";


const PORT = process.env.PORT || 4000;


const server = new GraphQLServer({
    schema,
    context: ({ request }) => ({ request }) //Request contains "user" and creates a server containing request.
});

server.express.use(logger("dev")); //Added middlewares.
server.express.use(authenticateJwt);

server.start({
    port: PORT
}, () => console.log(`Server running on port ${PORT}`))