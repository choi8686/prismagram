require("dotenv").config()
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";

const PORT = process.env.PORT || 4000;

// define type
const typeDefs = ` 
type Query{
    hello: String!
}`;

const resolvers = {
    Query:{
        hello : () => "Hi"
    }
}
const server = new GraphQLServer({
    typeDefs, resolvers
});

server.express.use(logger("dev")); //미들웨어 추가

server.start({port : PORT}, () => console.log(`Server running on port ${PORT}`))