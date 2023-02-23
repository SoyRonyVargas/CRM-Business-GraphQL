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
      books: () => books,
      obtenerLibro: ( parent , { input } , context ) => {
        const r = books.filter( b => b.title === input.name )
        console.log("resultado");
        console.log(input);
        console.log(r);
        return r
      }
    },
};

export default resolvers 