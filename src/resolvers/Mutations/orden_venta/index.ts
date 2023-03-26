import { CrearOrdenVenta , ActualizarOrdenVenta } from "../../../models/orden/types";
import { OrdenVentaConceptoModel } from "../../../models/orden/concepto";
import { OrdenVentaModel } from "../../../models/orden";
import { AlmacenModel } from "../../../models/almacen";
import handleError from "../../../utils/handleError";
import { BasicResolver } from "types";

export const calcularExistenciasProducto = async ( id: string ) : Promise<number> => {

    const entradas = await AlmacenModel.find({ 
        id_producto: {
            $eq: id
        },
        cantidad_restante: { "$gte": 0 },
    })

    // console.log("entradas")
    // console.log(entradas)

    let suma = 0;

    for( const entrada of entradas )
    {
        suma += entrada.cantidad_restante 
    }

    return suma;

}

const extraerExistencias = async ( id: string , cantidad: number ) : Promise<boolean> => {

    const entradas = await AlmacenModel.find({ 
        id: id,
        cantidad_restante: { "$gte": 0 },
    })

    let restante = cantidad;

    for ( let i = 0; ( i < entradas.length ) ; i++ )
    {
        
        const entrada = entradas[i]

        restante = entrada.cantidad_restante - restante

        if( restante < 0 )
        {
            
            restante = Math.abs(restante)

            entrada.cantidad_restante = 0

            await entrada.save()
            
        }
        else
        {
            
            entrada.cantidad_restante = restante
            
            await entrada.save()

            return true;

        }

    }

    return false;

}

const crearOrdenVenta : BasicResolver<CrearOrdenVenta> = async ( _ , { input } , context ) => {
    
    try
    {

        console.log("empeze orden venta");

        const { conceptos , ...restoOrden } = input

        const orden = new OrdenVentaModel(restoOrden)


        if( conceptos.length == 0 ) return handleError({
            msg: "La orden debe contener al menos un concepto"
        })

        orden.vendedor = context.authScope
        
        orden.fecha_entrega = new Date().toISOString()

        orden.status = 1;

        console.log("conceptos")
        console.log(conceptos)

        for( const concepto of conceptos )
        {
            
            const conceptoVenta = new OrdenVentaConceptoModel(concepto)

            // console.log("concepto")
            // console.log(concepto)
            // console.log(conceptoVenta)

            const existenciasTotales = await calcularExistenciasProducto(concepto.producto)

            console.log("Existencias totales");
            
            console.log(existenciasTotales);

            if( concepto.cantidad > existenciasTotales )
            {
                return handleError({
                    msg: `Existencias insuficientes del producto ${concepto.producto}`,
                    status: "404"
                })
            }

            await extraerExistencias(
                conceptoVenta.producto.id as string,
                conceptoVenta.cantidad
            )

            orden.conceptos.push(conceptoVenta.id);

            conceptoVenta.status = 1
            
            await conceptoVenta.save()
            
        }

        console.log("ORDEN FINAL");
        
        console.log(orden);

        await orden.save()

        return orden

    }
    catch(err)
    {
        console.log(err);
        return handleError()
    }

}

const actualizarOrdenVenta : BasicResolver<ActualizarOrdenVenta> = async ( _ , { input } , context ) => {

    try
    {

        const { id } = input

        const orden = await OrdenVentaModel.findById(id)

        if( !orden ) return handleError({
            msg: "Orden no encontrada",
            status: "404"
        })

        orden.status = input.status

        await orden.save()

        return orden

    }
    catch(err)
    {
        return handleError(err)
    }

}

export default {
    actualizarOrdenVenta,
    crearOrdenVenta
}