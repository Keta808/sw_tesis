"use strict";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import ReservaService from "../services/reserva.service.js";
import { reservaBodySchema, reservaIdSchema } from "../schema/reserva.schema.js";
import { handleError } from "../utils/errorHandler.js"; 

/**
 * Obtener una reserva  
 */
async function getReservas(req, res) {
    try {
        const [reservas, reservaError] = await ReservaService.getReservas();
        if (reservaError) return respondError(req, res, 404, reservaError);
        respondSuccess(req, res, 200, reservas);
    } catch (error) {
        handleError(error, "reserva.controller -> getReservas");
        respondError(req, res, 500, `Error obteniendo las reservas: ${error.message}`);
    }
}

/**
 * Crear una nueva reserva
 */
async function createReserva(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = reservaBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newReserva, reservaError] = await ReservaService.createReserva(body);
        if (reservaError) return respondError(req, res, 400, reservaError);
        respondSuccess(req, res, 201, newReserva);
    } catch (error) {
        handleError(error, "reserva.controller -> createReserva");
        respondError(req, res, 500, `Error creando la reserva ${error.message}`);
    }
}

/**
 * Obtener una reserva por su id
 */
async function getReservaById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = reservaIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [reserva, reservaError] = await ReservaService.getReservaById(params.id);
        if (reservaError) return respondError(req, res, 404, reservaError);
        respondSuccess(req, res, 200, reserva);
    } catch (error) {
        handleError(error, "reserva.controller -> getReservaById");
        respondError(req, res, 500, `Error obteniendo la reserva: ${error.message}`);
    }
}

/**
 * Cancelar una reserva por su id
 */
async function cancelReserva(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = reservaIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [reserva, reservaError] = await ReservaService.cancelReserva(params.id);
        if (reservaError) return respondError(req, res, 404, reservaError);
        respondSuccess(req, res, 200, reserva);
    } catch (error) {
        handleError(error, "reserva.controller -> cancelReserva");
        respondError(req, res, 500, `Error cancelando la reserva: ${error.message}`);
    }
} 


// Exporta las funciones del controlador de reservas
export default {
    getReservas,
    createReserva,
    getReservaById,
    cancelReserva,
}; 
