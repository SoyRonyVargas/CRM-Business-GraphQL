import verificarToken from "../../../utils/verificarToken";
import { UsuarioModel } from "../../../modelos/Usuario";
import { GenInput } from "types"


const obtenerUsuario = async ( _ , { input } : GenInput<string> ) => {
    
    const { id } = verificarToken(input);

    const usuario = await UsuarioModel.findOne({ id })

    return usuario

}

export default {
    obtenerUsuario
}