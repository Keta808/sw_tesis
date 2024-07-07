/* eslint-disable max-len */
"use strict";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import PymeService from "../services/pyme.service.js";
import { pymeBodySchema, pymeIdSchema } from "../schema/pyme.schema.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Obtiene todas las pymes
 */
async function getPymes(req, res) {
  try {
    const [pymes, errorPymes] = await PymeService.getPymes();
    if (errorPymes) return respondError(req, res, 404, errorPymes);

    pymes.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, pymes);
  } catch (error) {
    handleError(error, "pyme.controller -> getPymes");
    respondError(req, res, 400, `Error obteniendo las pymes: ${error.message}`);
  }
}

/**
 * Crea una nueva pyme
 */
async function createPyme(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = pymeBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);
    
        const [newPyme, pymeError] = await PymeService.createPyme(body);
    
        if (pymeError) return respondError(req, res, 400, pymeError);
        if (!newPyme) {
            return respondError(req, res, 400, "No se creo la pyme");
        }
    
        respondSuccess(req, res, 201, newPyme);
    } catch (error) {
        handleError(error, "pyme.controller -> createPyme");
        respondError(req, res, 500, `Error creando la pyme ${error.message}`);
    }
}

/**
 * Obtiene una pyme por su id
 */
async function getPymeById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = pymeIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);
    
        const [pyme, errorPyme] = await PymeService.getPymeById(params.id);
        if (errorPyme) return respondError(req, res, 404, errorPyme);
    
        respondSuccess(req, res, 200, pyme);
    } catch (error) {
        handleError(error, "pyme.controller -> getPymeById");
        respondError(req, res, 400, `Error obteniendo las pymes por id: ${error.message}`);
    }
}

/**
 * Obtiene pymes por su nombre
 */
async function getPymesByName(req, res) {
    try {
        const { nombre } = req.params;
        const [pymes, errorPymes] = await PymeService.getPymesByName(nombre);
        if (errorPymes) return respondError(req, res, 404, errorPymes);
    
        pymes.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, pymes);
    } catch (error) {
        handleError(error, "pyme.controller -> getPymesByName");
        respondError(req, res, 400, `Error obteniendo las pymes por nombre: ${error.message}`);
    }
}

/**
 * Obtiene pymes por su comuna
 */
async function getPymesByComuna(req, res) {
    try {
        const { comuna } = req.params;
        const [pymes, errorPymes] = await PymeService.getPymesByComuna(comuna);
        if (errorPymes) return respondError(req, res, 404, errorPymes);
    
        if (errorPymes) return respondError(req, res, 404, errorPymes);
        if (!pymes) return respondSuccess(req, res, 204); // No Content
    } catch (error) {
        handleError(error, "pyme.controller -> getPymesByComuna");
        respondError(req, res, 400, `Error obteniendo las pymes por comuna: ${error.message}`);
    }
}

/**
 * Actualiza una pyme por su id
 */
async function updatePyme(req, res) {
    try {
        const { params, body } = req;
        const { error: paramsError } = pymeIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);
    
        const [pyme, errorPyme] = await PymeService.updatePyme(params.id, body);
        if (errorPyme) return respondError(req, res, 404, errorPyme);
    
        respondSuccess(req, res, 200, pyme);
    } catch (error) {
        handleError(error, "pyme.controller -> updatePyme");
        respondError(req, res, 400, `Error actualizando la pyme por id: ${error.message}`);
    }
}

/**
 * Elimina una pyme por su id
 */
async function deletePyme(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = pymeIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);
    
        const [pyme, errorPyme] = await PymeService.deletePyme(params.id);
        if (errorPyme) return respondError(req, res, 404, errorPyme);
    
        respondSuccess(req, res, 200, pyme);
    } catch (error) {
        handleError(error, "pyme.controller -> deletePyme");
        respondError(req, res, 400, `Error eliminando la pymes por id: ${error.message}`);
    }
} 


/**
 * Filtrar pymes por categoría --  REVISAR/SIN PROBAR
 */  
async function getPymesByCategory(req, res) { 
    try { 
        const { categoria } = req.params; 
        const [pymes, errorPymes] = await PymeService.getPymesByCategory(categoria); 
        if (errorPymes) return respondError(req, res, 404, errorPymes); 
        if (!pymes) return respondSuccess(req, res, 204); 
    } catch (error) { 
        handleError(error, "pyme.controller -> getPymesByCategory"); 
        respondError(req, res, 400, `Error obteniendo las pymes por categoría: ${error.message}`); 
    } 
} 
/**
 * Filtrar pymes por categoría y comuna
 */
async function getPymesByCategoryAndComuna(req, res) {
    try {
        const { categoria, comuna } = req.params;
        const [pymes, errorPymes] = await PymeService.getPymesByCategoryAndComuna(categoria, comuna);
        if (errorPymes) return respondError(req, res, 404, errorPymes);
        if (!pymes) return respondSuccess(req, res, 204);
    } catch (error) {
        handleError(error, "pyme.controller -> getPymesByCategoryAndComuna");
        respondError(req, res, 400, `Error obteniendo las pymes por categoría y comuna: ${error.message}`);
    }
}
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
