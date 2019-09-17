import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
require("dotenv").config();

import {
    GraphQLServer
} from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import { sendSecretMail } from "./utils";

sendSecretMail("this0924@gmail.com", "123")
const PORT = process.env.PORT || 4000;


const server = new GraphQLServer({
    schema
});

server.express.use(logger("dev")); //미들웨어 추가

server.start({
    port: PORT
}, () => console.log(`Server running on port ${PORT}`))