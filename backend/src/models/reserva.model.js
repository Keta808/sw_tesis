"use strinct";


import mongoose from "mongoose";  
const ReservaSchema = new mongoose.Schema(
    { 
        idUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        idPyme: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pyme",
            required: true,
        },
        idHora: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "HoraSlot",
            required: true,
        },
        estado: {
            type: String,
            enum: ["Pendiente", "Confirmada", "Cancelada", "Finalizada"],
            default: "Pendiente",
            required: true,
        },
    },
    {
        versionKey: false,
    },
    

);


const Reserva = mongoose.model("Reserva", ReservaSchema);
export default Reserva;
