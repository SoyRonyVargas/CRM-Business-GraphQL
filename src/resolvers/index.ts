import Mutations from "./Mutations";
import Querys from "./Querys";

const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
      ...Querys
      // books: () => books,
      // obtenerLibro: ( parent , { input } , context ) => {
      //   const r = books.filter( b => b.title === input.name )
      //   console.log("resultado");
      //   console.log(input);
      //   console.log(r);
      //   return r
      // }
    },
    Mutation: {
      ...Mutations
    }
    
};

export default resolvers  