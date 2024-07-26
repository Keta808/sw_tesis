/* eslint-disable func-call-spacing */
/* eslint-disable spaced-comment */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
"use strict";
import HoraSlot from "../models/horaSlot.model.js";
import { handleError } from "../utils/errorHandler.js";


/** Todas las horas disponibles o no disponibles */
async function getHoraSlots() {
    try {
        const horaSlots = await HoraSlot.find().exec();
        if (!horaSlots) return [null, "No hay horas"];

        return [horaSlots, null];
    } catch (error) {
        handleError(error, "horaSlot.service -> getHoraSlots");
    }
}

/** Las horas disponibles  */

async function getHoraSlotsDisponibles() {
    try {
        const horaSlots = await HoraSlot.find({ disponibilidad: true }).exec();
        if (!horaSlots) return [null, "No hay horas disponibles"];

        return [horaSlots, null];
    } catch (error) {
        handleError(error, "horaSlot.service -> getHoraSlotsDisponibles");
    }
}


/** Crear una hora en la base de datos */

async function createHoraSlot(horaSlot) {
    try {
        const { idPyme, fecha, hora, disponibilidad } = horaSlot;

        const horaSlotFound = await HoraSlot.findOne({
            idPyme: horaSlot.idPyme,
            fecha: horaSlot.fecha,
            hora: horaSlot.hora,
        });

        if (horaSlotFound) return [null, "La hora ya existe"];

        const newHoraSlot = new HoraSlot({
            idPyme,
            fecha,
            hora,
            disponibilidad,
        });
        await newHoraSlot.save();

        return [newHoraSlot, null];
    } catch (error) {
        handleError(error, "horaSlot.service -> createHoraSlot");
    }
}

/** Borrar una hora con el id de mongoose */

async function deleteHoraSlotById(id) {
    try {
        const horaSlot = await HoraSlot.findByIdAndDelete(id).exec();
        if (!horaSlot) return [null, "La hora no existe"];

        return [horaSlot, null];
    } catch (error) {
        handleError(error, "horaSlot.service -> deleteHoraSlotById");
    }
}

/** Actualizar una hora con el id de mongoose */

async function updateHoraSlotById(id, horaSlot) {
    try {
        const updatedHoraSlot = await HoraSlot.findByIdAndUpdate(id, horaSlot, { new: true }).exec();
        if (!updatedHoraSlot) return [null, "La hora no existe"];      
        return [updatedHoraSlot, null];
    } catch (error) {
        handleError(error, "horaSlot.service -> updateHoraSlotById");
    }
}

/** Obtener una hora por su id de mongoose */

async function getHoraSlotById(id) {
    try {
        const horaSlot = await HoraSlot.findById(id).exec();
        if (!horaSlot) return [null, "La hora no existe"];

        return [horaSlot, null];
    } catch (error) {
        handleError(error, "horaSlot.service -> getHoraSlotById");
    }
}
/** Obtener las horas por la id de la pyme */

async function getHoraSlotByIdPyme(idPyme) {
    try {
        const horaSlot = await HoraSlot.find({ idPyme }).exec();
        if (!horaSlot) return [null, "La hora no existe"];

        return [horaSlot, null];
    } catch (error) {
        handleError(error, "horaSlot.service -> getHoraSlotByIdPyme");
    }
}

/**Generar un rango de horario de trabajo */

const generarRangoHora = (startTime, endTime, interval) => {
    const slots = [];
    let currentTime = startTime;

    while (currentTime < endTime) {
        slots.push(currentTime);
        currentTime = new Date(currentTime.getTime() + interval * 60000); // Suma el intervalo en minutos
    }

    return slots;
};

function convertirFechaFormatoISO(fecha) {
    const [dia, mes, año] = fecha.split("-");
    return `${año}-${mes}-${dia}`;
}


async function createRangeHour(idPyme, date, startTime, endTime, interval) {
    try {
        const formattedDate = convertirFechaFormatoISO(date);

        const start = new Date(formattedDate);
        start.setHours(startTime.split(":")[0], startTime.split(":")[1], 0, 0);

        const end = new Date(formattedDate);
        end.setHours(endTime.split(":")[0], endTime.split(":")[1], 0, 0);

        console.log("Fecha de inicio:", start);
        console.log("Fecha de fin:", end);

        const slots = generarRangoHora(start, end, interval);

        console.log("Slots generados:", slots);

        // Buscar slots ya existentes en la base de datos para idPyme y fecha
        const existingSlots = await HoraSlot.find({
            idPyme,
            fecha: {
                $gte: start,
                $lt: new Date(start.getTime() + 24 * 60 * 60 * 1000) // fecha para el mismo día
            }
        });

        // Filtrar slots que ya existen
        const existingSlotsMap = new Map(existingSlots.map(slot => [slot.hora, slot]));
        const horaSlots = slots.filter(slot => !existingSlotsMap.has(slot.toTimeString().slice(0, 5)))
            .map((slot) => ({
                idPyme,
                fecha: slot,
                hora: slot.toTimeString().slice(0, 5),
                disponibilidad: true,
            }));

        console.log("HoraSlots a insertar:", horaSlots);

        if (horaSlots.length === 0) {
            return [[], "No se encontraron nuevos slots para insertar"];
        }

        const createdSlots = await HoraSlot.insertMany(horaSlots);
        console.log("HoraSlots creados:", createdSlots);

        return [createdSlots, null];
    } catch (error) {
        console.error("Error en createRangeHour:", error);
        handleError(error, "horaSlot.service -> createTimeSlotsForDay");
        return [null, "Error al crear los slots de horario"];
    }
}


//funcion para obtener los slots de horario ordenados por fecha y hora
async function getSortedHoraSlots(idPyme) {
    try {
        const horaSlots = await HoraSlot.find({ idPyme }).sort({ fecha: 1, hora: 1 });
        return [horaSlots, null];
    } catch (error) {
        console.error("Error en getSortedHoraSlots:", error);
        return [null, "Error al obtener los slots de horario"];
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
    createRangeHour,
    getSortedHoraSlots,
};
