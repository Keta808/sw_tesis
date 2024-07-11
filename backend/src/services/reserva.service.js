/* eslint-disable require-jsdoc */
"use strict";

import { handleError } from "../utils/errorHandler.js";

import Reserva from "../models/reserva.model.js";
import User from "../models/user.model.js";
import Pyme from "../models/pyme.model.js";


async function getReservas() {
    try {
        const reservas = await Reserva.find().exec();
        if (!reservas) return [null, "No hay reservas"];

        return [reservas, null];
    } catch (error) {
        handleError(error, "reserva.service -> getReservas");
    }
} 


async function createReserva(reserva) {
    try {
        const { idUser, idPyme, idHora } = reserva;

        const newReserva = new Reserva({
            idUser,
            idPyme,
            idHora,
            estado: "pendiente",
        });
        await newReserva.save();

        // Actualizar el usuario
        await User.findByIdAndUpdate(idUser, { $push: { reservas: newReserva._id } });

        // Actualizar la pyme
        await Pyme.findByIdAndUpdate(idPyme, { $push: { reservas: newReserva._id } });

        return [newReserva, null];
    } catch (error) {
        handleError(error, "reserva.service -> createReserva");
        return [null, error.message];
    }
}
/**
 * Obtener reserva por ID
 */
async function getReservaById(id) {
    try {
        const reserva = await Reserva.findById(id).exec();
        if (!reserva) return [null, "La reserva no existe"];
        return [reserva, null];
    } catch (error) {
        handleError(error, "reserva.service -> getReservaById");
        return [null, error.message];
    }
} 

/**
 * Cancelar reserva por ID
 */
async function cancelReserva(id) {
    try {
        const reserva = await Reserva.findById(id).exec();
        if (!reserva) return [null, "La reserva no existe"];

        reserva.estado = "Cancelada";
        await reserva.save();

        return [reserva, null];
    } catch (error) {
        handleError(error, "reserva.service -> cancelReserva");
        return [null, error.message];
    }
} 

/**
 * actualizr reserva por ID
 */ 

async function updateReservaById(id, reserva) {
    try {
        const updatedReserva = await Reserva.findByIdAndUpdate(id, reserva, { new: true }).exec();
        if (!updatedReserva) return [null, "La reserva no existe"];
        return [updatedReserva, null];
    } catch (error) {
        handleError(error, "reserva.service -> updateReservaById");
        return [null, error.message];
    }
}
// Exporta las funciones del servicio de reservas
export default { 
    getReservas,
    createReserva,
    getReservaById,
    cancelReserva, 
    updateReservaById,
};

