import { CrearOrdenVenta , ActualizarOrdenVenta } from "../../../models/orden/types";
import { OrdenVentaConceptoModel } from "../../../models/orden/concepto";
import { ProductoModel , IProducto } from "../../../models/producto";
import { OrdenVentaModel } from "../../../models/orden";
import handleError from "../../../utils/handleError";
import { BasicResolver } from "types";

const extraerExistencias = async ( id: string , cantidad: number ) : Promise<boolean> => {

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

            const producto : IProducto = await ProductoModel.findById(concepto.producto)

            if( concepto.cantidad > producto.existencias )
            {
                return handleError({
                    msg: `Existencias insuficientes del producto ${concepto.producto}`,
                    status: "404"
                })
            }

            // await extraerExistencias(
            //     conceptoVenta.producto.id as string,
            //     conceptoVenta.cantidad
            // )

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