import { CrearUsuario , UsuarioPayload } from '../modelos/Usuario/types'
import jsonwebtoken , { SignOptions } from 'jsonwebtoken'

const crearToken = ( payload : CrearUsuario ) : string | null => {
  
    try
    {

        const { id } = payload

        const finalPayload : UsuarioPayload = {
            id
        }

        const configToken: SignOptions = {
            expiresIn: "24h"
        }

        const token = jsonwebtoken.sign( 
            finalPayload , 
            process.env.SECRET_JWT_TOKEN ,
            configToken
        )

        return token

    }
    catch(err)
    {
        return null;
    }

}

export default crearToken