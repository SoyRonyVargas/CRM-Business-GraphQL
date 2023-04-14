import { CrearOrdenVenta , ActualizarOrdenVenta } from "../../../models/orden/types";
import { OrdenVentaConceptoModel } from "../../../models/orden/concepto";
import { ConceptoCarritoModel } from "../../../models/carrito/concepto";
import { ProductoModel , IProducto } from "../../../models/producto";
import { OrdenVentaModel } from "../../../models/orden";
import handleError from "../../../utils/handleError";
import { BasicResolver } from "types";

const extraerExistencias = async ( id_producto: string , cantidad: number ) : Promise<boolean> => {

    const producto : IProducto = await ProductoModel.findById(id_producto)

    let existencias_restantes = producto.existencias - cantidad;

    if( existencias_restantes < 0 )
    {
        existencias_restantes = 0;
    }

    producto.existencias = existencias_restantes;

    await producto.save()

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
            
            // CREAMOS EL CONCEPTO DE LA ORDEN DE VENTA
            const conceptoVenta = new OrdenVentaConceptoModel(concepto)

            // BUSCAMOS EL PRODUCTO DEL CONCEPTO
            const producto : IProducto = await ProductoModel.findById(concepto.producto)

            // VALIDAMOS QUE TENGA EXISTENCIAS SUFICIENTES
            if( concepto.cantidad > producto.existencias )
            {
                return handleError({
                    msg: `Existencias insuficientes del producto ${concepto.producto}`,
                    status: "404"
                })
            }


            // LE PONES DE STATUS ACTIVO
            conceptoVenta.status = 1
            
            // A LA ORDEN LE AGREGAMOS EL CONCEPTO
            orden.conceptos.push(conceptoVenta.id);
            
            // GUARDAMOS EL CONCEPTO
            await conceptoVenta.save()

            // REMOVEMOS EL CONCEPTO DEL CARRITO
            await ConceptoCarritoModel.findByIdAndRemove(concepto.concepto_carrito);

            // DESCONTAMOS LAS EXISTENCIAS
            await extraerExistencias(
                producto.id,
                conceptoVenta.cantidad
            );
            
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