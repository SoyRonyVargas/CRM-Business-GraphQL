import mongoose from "mongoose";

const conectarBaseDeDatos = async () => {

    try 
    {
     
        await mongoose.connect(process.env.DB)
        
    } catch (error) {
        
    }

}