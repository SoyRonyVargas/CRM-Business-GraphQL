import Mutations from "./mutations";
import Querys from "./querys";

const resolvers = {
    Query: {
      ...Querys
    },
    Mutation: {
      ...Mutations
    },
};

export default resolvers  