const { GraphQLUpload } = require('apollo-upload-server');
import Mutations from "./mutations";
import Querys from "./querys";

const resolvers = {
    Query: {
      ...Querys
    },
    Mutation: {
      ...Mutations
    },
    Upload: GraphQLUpload
};

export default resolvers  