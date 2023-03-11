import { ActualizarProducto, CrearProducto } from "../../../models/producto/types";
import { ProductoModel } from "../../../models/producto";
import handleError from "../../../utils/handleError";
// import almacenarImagen from "@utils/almacenarImagen";
import { GraphQLError } from "graphql";
import { createWriteStream } from "fs";
import { GenInput } from "types";
const path = require("path");

const crearProducto = async ( _ , { file } : any ) => {

    try
    {
        console.clear()
        
        console.log("file");
        console.log(file);

        const obj = await file

        console.log('obj');
        console.log(obj);
        
        // const { stream } = await file

        // console.log("file");
        // console.log(stream);
        // console.log("input");
        // console.log(input);
        // almacenarImagen(create)

        // await new Promise(res =>
        //     createReadStream()
        //       .pipe(createWriteStream(path.join(__dirname, "../images", file.filename)))
        //       .on("close", res)
        //   );
    

        // const productoNuevo = new ProductoModel(input)

        // await productoNuevo.save()

        return {}

    }
    catch(err)
    {

        console.log(err);

        return handleError({
            msg: "Error al crear el producto",
            status: "200"
        })

    }

}

const actualizarProducto = async ( _ , { input } : GenInput<ActualizarProducto> ) => {

    try
    {

        const producto = await ProductoModel.findById(input.id)

        if( !producto ) return new GraphQLError( "Producto no encontrado" , {
            extensions: { code: 'NOT_FOUND' , http: { code: 404 } },
        });

        const productoActualizado = await ProductoModel.findByIdAndUpdate( producto.id , input , { new: true })

        return productoActualizado

    }
    catch(err)
    {

        console.log(err);

        throw new GraphQLError('Error al actualizar el producto', {
            extensions: {
              code: 'BAD_REQUEST',
              http: { status: 401 },
            }
        });

    }

}

const eliminarProducto = async ( _ , { input } : GenInput<string> ) => {

    try
    {

        await ProductoModel.findByIdAndDelete(input)

        return true

    }
    catch(err)
    {

        console.log(err);

        throw new GraphQLError('Error al elimiar el producto', {
            extensions: {
              code: 'BAD_REQUEST',
              http: { status: 401 },
            }
        });

    }

}


export default {
    actualizarProducto,
    eliminarProducto,
    crearProducto,
}