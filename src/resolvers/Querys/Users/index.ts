import verificarToken from "../../../utils/verificarToken";
import { OrdenVentaModel } from "../../../models/orden";
import { UsuarioModel } from "../../../models/usuario";
import { GenInput } from "types"

const obtenerUsuario = async ( _ , { input } : GenInput<string> ) => {
    
    const { id } = verificarToken(input);

    const usuario = await UsuarioModel.findOne({ id })

    return usuario

}

const mejoresVendedores = async () => {
    
    const mejores_vendedores = await OrdenVentaModel.aggregate([
        {
            $lookup: {
                from: "ordenventaconceptos",
                localField: "conceptos",
                foreignField: "_id",
                as: "conceptos"
            }
        },
        { 
            $match: { 
                status: 1 
            } 
        },
        {
            $lookup: {
                from: "usuarios",
                localField: "vendedor",
                foreignField: "_id",
                as: "vendedor"
            }
        }, 
        { 
            $group: {
                _id: "$vendedor",
                vendedor: {
                    $first: "$vendedor",
                },
                total: {
                    $sum: {
                        $sum: "$conceptos.total"
                    }
                },
            },
        },
        {
            $sort: {
                total: -1
            }
        }
    ])

    return mejores_vendedores

}

export default {
    mejoresVendedores,
    obtenerUsuario,
}