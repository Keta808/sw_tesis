import Joi from 'joi';

// Función para validar y transformar el formato de fecha
function validateAndTransformDate(value, helpers) {
    if (typeof value !== 'string') {
        return { value, errors: helpers.error('any.invalid') };
    }

    const dateFormatRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!value.match(dateFormatRegex)) {
        return { value, errors: helpers.error('date.format') };
    }

    const [day, month, year] = value.split('-');
    const parsedDate = new Date(`${year}-${month}-${day}`);

    if (parsedDate < new Date()) {
        return helpers.error('date.greater', { limit: 'today' });
    }

    return parsedDate;
}

// Extensión personalizada de Joi para manejar fechas con formato específico
const JoiDateExtension = Joi.extend((Joi) => ({
    type: 'date',
    base: Joi.date(),
    messages: {
        'date.greater': '{{#label}} must be greater than "{{#limit}}"',
        'date.format': '{{#label}} must be in DD-MM-YYYY format',
        'any.invalid': '{{#label}} must be a string'
    },
    validate(value, helpers, args) {
        return validateAndTransformDate(value, helpers);
    }
}));

const horaSlotBodySchema = Joi.object({
    idPyme: Joi.string().required(),
    fecha: Joi.string().required(), // Aquí se espera que "fecha" sea una cadena
    hora: Joi.string().pattern(/^([08]|09|1\d|2[0-2]):[0-5][0-9]$/).required(),
    disponibilidad: Joi.boolean().required()
}).options({ abortEarly: false });

const horaSlotIdSchema = Joi.object({
    id: Joi.string().required()
});

export { horaSlotBodySchema, horaSlotIdSchema };
