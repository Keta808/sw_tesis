"use strinct";

import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import CATEGORIA from "../constants/categoria.constants.js";

const pymeSchema = new mongoose.Schema(
    {
        idUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        nombre: {
            type: String,
            required: true,
        },
        descripcion: {
            type: String,
            required: true,
        },
        telefono: {
            type: String,
            required: true,
        },
        comuna: {
            type: String,
            required: true,
        },
        direccion: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
    },
);

// Definir indice unico en email, nombre y direccion
pymeSchema.index({ email: 1, nombre: 1, direccion: 1 }, { unique: true });

const Pyme = mongoose.model("Pyme", pymeSchema);
export default Pyme;
