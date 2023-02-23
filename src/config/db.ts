import mongoose from "mongoose";

const conectarBaseDeDatos = async () => {

    try 
    {
     
        await mongoose.connect(process.env.DB , {
            dbName: "React-Avanzado-GraphQL"
        })

        console.log("Base de datos conectada");
        
        
    } 
    catch (error) 
    {
        
        console.error("Error en la base de datos");
        
        throw new Error(error)
        
    }

}

export default conectarBaseDeDatos