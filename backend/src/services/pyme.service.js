/* eslint-disable no-console */
"use strict";
// Importa el modelo de datos 'Pyme'
import Pyme from "../models/pyme.model.js"; 
import CATEGORIA from "../constants/categoria.constant.js"; 

import { handleError } from "../utils/errorHandler.js";

/**
 * Obtener todas las pymes de la base de datos
 */
async function getPymes() {
  try {
    const pymes = await Pyme.find().exec();
    if (!pymes) return [null, "No hay pymes"];

    return [pymes, null];
  } catch (error) {
    handleError(error, "pyme.service -> getPymes");
  }
}

/**
 * Crear una nueva pyme en la base de datos
 */
async function createPyme(pyme) {
    try {
        const { idUser, nombre, descripcion, telefono, comuna, direccion, email, categoria } = pyme;
    
        const pymeFound = await Pyme.findOne({
            email: pyme.email,
            nombre: pyme.nombre,
            direccion: pyme.direccion,
        });

        if (pymeFound) return [null, "La pyme ya existe"]; 
       
        // Validación de la categoría
        if (!CATEGORIA.includes(categoria)) {
            return [null, "Categoría inválida"];
        }
    
        const newPyme = new Pyme({
        idUser,
        nombre,
        descripcion,
        telefono,
        comuna,
        direccion,
        email, 
        categoria, 

        });
        await newPyme.save();
    
        return [newPyme, null];
    } catch (error) {
        handleError(error, "pyme.service -> createPyme");
    }
}

/**
Obtener pymes por su id de la base de datos ()
 */
async function getPymeById(id) {
    try {
        const pyme = await Pyme.findById(id).exec();
        if (!pyme) return [null, "La pyme no existe"];
    
        return [pyme, null];
    } catch (error) {
        handleError(error, "pyme.service -> getPymeById");
    }
}

/**
 * obtener pymes por su nombre en la base de datos
 */
async function getPymesByName(nombre) {
    try {
        const pymes = await Pyme.find({ nombre }).exec();
        if (!pymes || pymes.length === 0) return [null, "No se encontraron pymes con ese nombre"];
    
        return [pymes, null];
    } catch (error) {
        handleError(error, "pyme.service -> getPymesByName");
    }
}

/**
 * obtener pymes por su comuna en la base de datos
 */
async function getPymesByComuna(comuna) {
    try {
        const pymes = await Pyme.find({ comuna }).exec();
        if (!pymes || pymes.length === 0) {
            return [null, "No se encontraron pymes en la comuna"];
        }

        return [pymes, null];
    } catch (error) {
        handleError(error, "pyme.service -> getPymesByComuna");
        return [null, `Error obteniendo las pymes por comuna: ${error.message}`];
    }
}

/**
 * Actualiza una pyme por su id en la base de datos
 */
async function updatePyme(id, pyme) {
    try {
        const pymeFound = await Pyme.findById(id);
        if (!pymeFound) return [null, "La pyme no existe"];
    
        const { idUser, nombre, descripcion, telefono, comuna, direccion, email, categoria } = pyme;
        const updateFields = {
            idUser,
            nombre,
            descripcion,
            telefono,
            comuna,
            direccion,
            email,
            categoria,
        };

        // Actualiza la pyme y retorna la pyme actualizada
        const updatePyme = await Pyme.findByIdAndUpdate(id, updateFields, { new: true });
    
        return [updatePyme, null];
    } catch (error) {
        handleError(error, "pyme.service -> updatePyme");
    }
}

/**
 * Elimina una pyme por su id de la base de datos
 */
async function deletePyme(id) {
    try {
        const pyme = await Pyme.findByIdAndDelete(id).exec();
        if (!pyme) return [null, "La pyme no existe"];
    
        return [pyme, null];
    } catch (error) {
        handleError(error, "pyme.service -> deletePyme");
    }
}

/**
 * Filtrar pymes por categoría
 */
async function getPymesByCategory(categoria) {
    try {
        // Verificar si la categoría es válida
        if (!CATEGORIA.includes(categoria)) {
            console.log(`Categoría inválida: ${categoria}`);
            return [null, "Categoría inválida"];
        }

        // Buscar todas las Pymes con la categoría especificada
        const pymes = await Pyme.find({ categoria }).exec();
        console.log(`Pymes encontradas: ${pymes}`);

        if (!pymes || pymes.length === 0) {
            console.log(`No se encontraron pymes para la categoría: ${categoria}`);
            return [null, "No se encontraron pymes con esa categoría"];
        }

        return [pymes, null];
    } catch (error) {
        handleError(error, "pyme.service -> getPymesByCategory");
        return [null, "Error al buscar pymes por categoría"];
    }
}
/**
 * Filtrar pymes por categoría y comuna REVISAR/STANDBY
 */
async function getPymesByCategoryAndComuna(categoria, comuna) {
    try {
        // Verificar si la categoría es válida
        if (!CATEGORIA.includes(categoria)) {
            return [null, "Categoría inválida"];
        }

       // Buscar todas las Pymes con la categoría y comuna especificadas
       const pymes = await Pyme.find({ categoria, comuna }).exec();

        if (!pymes || pymes.length === 0) {
            return [null, "No se encontraron pymes con esa categoría y comuna"];
        }

        return [pymes, null];
    } catch (error) {
        handleError(error, "pyme.service -> getPymesByCategoryAndComuna");
        return [null, "Error al buscar pymes por categoría y comuna"];
    }
}

// Exporta las funciones del servicio de pymes
export default {
    getPymes,
    createPyme,
    getPymeById,
    getPymesByName,
    getPymesByComuna,
    updatePyme,
    deletePyme, 
    getPymesByCategory,
    getPymesByCategoryAndComuna,
};
