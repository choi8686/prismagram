import path from "path";
import {
  makeExecutableSchema
} from "graphql-tools";
import {
  fileLoader,
  mergeResolvers,
  mergeTypes
} from "merge-graphql-schemas";

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
});

export default schema;

//api 폴더의 모든 파일들을 schema 파일에서 한번에 받음