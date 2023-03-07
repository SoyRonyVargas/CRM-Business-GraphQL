import { ClienteModel } from './src/models/clientes/index'
import mongoose from "mongoose";
// mongoose.model("Cliente").schema.add({
//     fecha_nacimiento: String
// })
ClienteModel.updateMany({
    $set: { "fecha_nacimiento" : Date.now } 
})