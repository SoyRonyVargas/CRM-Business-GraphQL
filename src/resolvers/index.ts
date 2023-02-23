import { CrearUsuario } from "../modelos/Usuario/types";
import { UsuarioModel } from "../modelos/Usuario"; 
import { GraphQLError } from 'graphql';

type GenInput<T> = {
    input: T
}

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
    Mutation: {
      
      nuevoUsuario: async ( _ , { input } : GenInput<CrearUsuario> ) => {
        
        // REVISAMOS SI EL USUARIO YA EXISTE

          const { email } = input

          const user = await UsuarioModel.findOne({ email })

          if( user )
          {

            throw new GraphQLError("Usuario ya existente" , {
              extensions: { code: 'BAD_USER_INPUT' },
            })

          }

          console.log(input);

          const x = new UsuarioModel();

          return 1

        

      }

    }
    
};

export default resolvers 