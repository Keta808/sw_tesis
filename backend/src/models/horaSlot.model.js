import mongoose from "mongoose";

const horaSlotSchema = new mongoose.Schema({
    idPyme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pyme",
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    hora: {
        type: String,
        required: true,
    },
    disponibilidad: {
        type: Boolean,
        required: true,
    },
});


const HoraSlot = mongoose.model("HoraSlot", horaSlotSchema);

export default HoraSlot;
