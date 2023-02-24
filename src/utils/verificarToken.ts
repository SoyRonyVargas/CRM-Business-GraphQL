import { UsuarioPayload } from "../modelos/Usuario/types"
import jsonwebtoken, { JwtPayload } from "jsonwebtoken"

const verificarToken = ( token : string ) : UsuarioPayload | null => {
  
    try
    {

        const user = jsonwebtoken.verify( token , process.env.SECRET_JWT_TOKEN ) as UsuarioPayload;
        
        return user

    }
    catch(err)
    {

        console.error(err);

        return null;

    }

}

export default verificarToken
