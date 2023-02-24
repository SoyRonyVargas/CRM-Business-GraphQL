import { AuthUsuario, CrearUsuario } from "../../../modelos/Usuario/types"
import comparePassword from "../../../utils/comparePassword"
import { UsuarioModel } from "../../../modelos/Usuario"
import hashPassword from "../../../utils/hashPassword"
import crearToken from "../../../utils/crearToken"
import { GraphQLError } from "graphql"
import { GenInput } from "types"

const authUsuario = async ( _ , { input } : GenInput<AuthUsuario> ) => {

    // SI EL USUARIO EXISTE

    const { email , password } = input

    const usuario = await UsuarioModel.findOne({ email })

    if( !usuario )
    {
        throw new GraphQLError("Usuario no valido" , {
            extensions: { code: 'BAD_USER_INPUT' },
        })   
    }
    
    // SI EL PASSWORD HACE MATCH 
    const result = await comparePassword( password , usuario.password )
    
    if( !result )
    {
        throw new GraphQLError("Usuario no valido" , {
            extensions: { code: 'BAD_USER_INPUT' },
        })   
    }

    const token = crearToken( usuario )

    return {
      token
    }

}

const nuevoUsuario = async ( _ , { input } : GenInput<CrearUsuario> ) => {
        
    // REVISAMOS SI EL USUARIO YA EXISTE

      const { email } = input

      const user = await UsuarioModel.findOne({ email })

      if( user )
      {

        throw new GraphQLError("Usuario ya existente" , {
          extensions: { code: 'BAD_USER_INPUT' },
        })

      }

      try
      {

        const usuario = new UsuarioModel(input)

        usuario.password = await hashPassword(usuario.password)

        await usuario.save()
        
        return usuario

      }
      catch(err)
      {
        
        throw new GraphQLError( err , {
          extensions: { code: 'INTERNAL_SERVER_ERROR' },
        })

      }

}

export default {
    nuevoUsuario,
    authUsuario
}