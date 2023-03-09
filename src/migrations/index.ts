import { ProductoModel } from '../models/producto'
import { ClienteModel } from '../models/clientes'
import { UsuarioModel } from '../models/usuario'
import hashPassword from '../utils/hashPassword'
import conectarBaseDeDatos from '../config/db'
import dotenv from 'dotenv'

dotenv.config()

const makeSeed = async () => {

    await conectarBaseDeDatos()

    try
    {

        console.log("Creando modelos...");

        // CREAMOS UN USUARIO 

        const pass = await hashPassword("1234")

        const usuario = new UsuarioModel({
            nombre: "Jony",
            apellidos: "Hernandez Molina",
            email: "jony@gmail.com",
            password: pass
        })

        await usuario.save()
        
        const producto = new ProductoModel({
            nombre: "CD Ballands 1",
            descripcion: "Descripcion generica",
            imagen: "https://m.media-amazon.com/images/I/81pf4NjVhfL._AC_SL1500_.jpg",
            precio: 308,
            status: 0
        })

        await producto.save()

        await usuario.save()

        const cliente = new ClienteModel({
            nombre: "George",
            apellido: "Miller",
            fecha_nacimiento: new Date(),
            telefono: "+52 9982636874",
            email: "joji@gmail.com",
            empresa: "Dinero S.A. de C.V",
            status: 0,
            vendedor: usuario.id,
            rfc: "XAXX010101000"
        })

        await cliente.save()

        console.clear()
        console.log("Base de datos creada");
        console.log("Modelos creados :)");

        process.exit()

    }
    catch(err)
    {
        console.log("Error al crear la semilla")
        console.error(err)
        console.log("Error al crear la semilla")
    }

}

makeSeed()

