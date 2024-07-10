"use strict";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import HoraSlotService from "../services/horaSlot.service.js";
import { horaSlotBodySchema, horaSlotIdSchema } from "../schema/horaSlot.schema.js";
import { handleError } from "../utils/errorHandler.js";

/** obtener todas las horas */
async function getHoraSlots(req, res) {
    try {
        const [horaSlots, errorHoraSlots] = await HoraSlotService.getHoraSlots();
        if (errorHoraSlots) return respondError(req, res, 404, errorHoraSlots);

        horaSlots.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, horaSlots);
    } catch (error) {
        handleError(error, "horaSlot.controller -> getHoraSlots");
        respondError(req, res, 400, `Error obteniendo las horas: ${error.message}`);
    }
}

/** obtener todas las horas disponibles */
async function getHoraSlotsDisponibles(req, res) {
    try {
        const [horaSlots, errorHoraSlots] = await HoraSlotService.getHoraSlotsDisponibles();
        if (errorHoraSlots) return respondError(req, res, 404, errorHoraSlots);

        horaSlots.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, horaSlots);
    } catch (error) {
        handleError(error, "horaSlot.controller -> getHoraSlotsDisponibles");
        respondError(req, res, 400, `Error obteniendo las horas disponibles: ${error.message}`);
    }
}

/** Crear una hora en la base de datos */
async function createHoraSlot(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = horaSlotBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        // Convertir la fecha de "DD-MM-YYYY" a Date
        const { idPyme, fecha, hora, disponibilidad } = body;
        const [day, month, year] = fecha.split('-');
        const isoDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate()-1);

        if (isoDate < yesterday) {
            return respondError(req, res, 400, "La fecha no puede ser menor a la actual");
        }

        // Crear el nuevo HoraSlot
        const [newHoraSlot, horaSlotError] = await HoraSlotService.createHoraSlot({ idPyme, fecha: isoDate, hora, disponibilidad });

        if (horaSlotError) return respondError(req, res, 400, horaSlotError);
        if (!newHoraSlot) {
            return respondError(req, res, 400, "No se creó la hora");
        }

        respondSuccess(req, res, 201, newHoraSlot);
    } catch (error) {
        handleError(error, "horaSlot.controller -> createHoraSlot");
        respondError(req, res, 500, `Error creando la hora: ${error.message}`);
    }
}


/** Borrar una hora con el id de mongoose */
async function deleteHoraSlotById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = horaSlotIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [horaSlot, errorHoraSlot] = await HoraSlotService.deleteHoraSlotById(params.id);
        if (errorHoraSlot) return respondError(req, res, 404, errorHoraSlot);

        respondSuccess(req, res, 200, horaSlot);
    } catch (error) {
        handleError(error, "horaSlot.controller -> deleteHoraSlotById");
        respondError(req, res, 400, `Error eliminando la hora: ${error.message}`);
    }
}

/** Actualizar una hora con el id mongoose */
async function updateHoraSlotById(req, res) {
    try {
        const { params, body } = req;
        const { error: paramsError } = horaSlotIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const { error: bodyError } = horaSlotBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [horaSlot, errorHoraSlot] = await HoraSlotService.updateHoraSlotById(params.id, body);
        if (errorHoraSlot) return respondError(req, res, 404, errorHoraSlot);

        respondSuccess(req, res, 200, horaSlot);
    } catch (error) {
        handleError(error, "horaSlot.controller -> updateHoraSlotById");
        respondError(req, res, 400, `Error actualizando la hora: ${error.message}`);
    }
}

/** obtener una hora por id */
async function getHoraSlotById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = horaSlotIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [horaSlot, errorHoraSlot] = await HoraSlotService.getHoraSlotById(params.id);
        if (errorHoraSlot) return respondError(req, res, 404, errorHoraSlot);

        respondSuccess(req, res, 200, horaSlot);
    } catch (error) {
        handleError(error, "horaSlot.controller -> getHoraSlotById");
        respondError(req, res, 400, `Error obteniendo la hora por id: ${error.message}`);
    }
}

/** Crear slots de horario en un rango */
async function createRangeHourController(req, res) {
    try {
        const { idPyme, date, startTime, endTime, interval } = req.body;

        if (!idPyme || !date || !startTime || !endTime || !interval) {
            return res.status(400).json({ error: "Faltan parámetros requeridos" });
        }

        const [createdSlots, error] = await HoraSlotService.createRangeHour(idPyme, date, startTime, endTime, interval);

        if (error) {
            return res.status(500).json({ error });
        }

        return res.status(201).json({ message: "Slots creados exitosamente", slots: createdSlots });
    } catch (error) {
        handleError(error, "horaSlot.controller -> createRangeHourController");
        return res.status(500).json({ error: "Error al crear los slots de horario" });
    }
}

/** Obtener las horas por la id de la pyme */
async function getHoraSlotByIdPyme(req, res) {
    try {
        const { idPyme } = req.params;
        const [horaSlot, errorHoraSlot] = await HoraSlotService.getHoraSlotByIdPyme(idPyme);
        if (errorHoraSlot) return respondError(req, res, 404, errorHoraSlot);

        respondSuccess(req, res, 200, horaSlot);
    } catch (error) {
        handleError(error, "horaSlot.controller -> getHoraSlotByIdPyme");
        respondError(req, res, 400, `Error obteniendo las horas por id de la pyme: ${error.message}`);
    }
}

export default {
    getHoraSlots,
    getHoraSlotsDisponibles,
    createHoraSlot,
    deleteHoraSlotById,
    updateHoraSlotById,
    getHoraSlotById,
    getHoraSlotByIdPyme,
    createRangeHour: createRangeHourController

};
