"use strinct";

import mongoose from "mongoose"; 

import { model, Schema } from "mongoose"; 
import TipoServicio from "../constants/categoria.constant.js";
const Categoria = new Schema(
    {
        idPyme: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pyme",
            required: true,
        },
        categoria: {
            type: String,
            enum: TipoServicio,
            required: true, 
        }, 
        
    }, 
    {
        versionKey: false,
    },

);    

const CategoriaModel = model("Categoria", Categoria); 
export default CategoriaModel;
