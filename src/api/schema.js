import { makeExecutableSchema } from "graphql-tools";
import {fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas"
import path from "path";

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"))
const allResolvers = fileLoader(path.join(__dirname, "./api/**/*.js"))

//api 폴더 밑에는 resolver나 graphql이 아닌 파일은 두면 안됨!

const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolvers: mergeResolvers(allResolvers)
});

export default schema;

//api 폴더의 모든 파일들을 schema 파일에서 한번에 받음