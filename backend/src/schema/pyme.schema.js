"use strict";

import Joi from "joi";
const phoneRegex = /^[0-9]{9}$/; // Solo acepta 9 digitos

/**
 * Esquema de validacion para el cuerpo de la solicitud de pyme
 */
const pymeBodySchema = Joi.object({
    idPyme: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
        "string.empty": "El usuario no puede estar vacío.",
        "any.required": "El usuario es obligatorio.",
        "string.base": "El usuario debe ser de tipo string.",
        "string.pattern.base": "El id usuario proporcionado no es un ObjectId válido.",
    }),
    nombre: Joi.string().required().min(3).max(100).messages({
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio.",
        "string.base": "El nombre debe ser de tipo string.",
        "string.min": "El nombre debe tener al menos 3 caracteres.",
        "string.max": "El nombre debe tener como máximo 100 caracteres.",
    }),
    telefono: Joi.string().pattern(phoneRegex).required().messages({
        "string.empty": "El telefono no puede estar vacío.",
        "any.required": "El telefono es obligatorio.",
        "string.base": "El telefono debe ser de tipo string.",
        "string.pattern.base": "El telefono debe tener exactamente 9 digitos.",
    }),
    comuna: Joi.string().min(3).max(100).required().messages({
        "string.empty": "La comuna no puede estar vacía.",
        "any.required": "La comuna es obligatoria.",
        "string.base": "La comuna debe ser de tipo string.",
        "string.min": "La comuna debe tener al menos 3 caracteres.",
        "string.max": "La comuna debe tener como máximo 100 caracteres.",
    }),
    direccion: Joi.string().min(3).max(200).required().messages({
        "string.empty": "La direccion no puede estar vacía.",
        "any.required": "La direccion es obligatoria.",
        "string.base": "La direccion debe ser de tipo string.",
        "string.min": "La direccion debe tener al menos 3 caracteres.",
        "string.max": "La direccion debe tener como máximo 200 caracteres.",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "El email no puede estar vacío.",
        "any.required": "El email es obligatorio.",
        "string.base": "El email debe ser de tipo string.",
        "string.email": "El email debe tener un formato válido.",
    }),
    }).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    });

/**
 * Esquema de validacion para el id de pyme
 */
const pymeIdSchema = Joi.object({
    id: Joi.string()
      .required()
      .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
      .messages({
        "string.empty": "El id no puede estar vacío.",
        "any.required": "El id es obligatorio.",
        "string.base": "El id debe ser de tipo string.",
        "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
      }),
  });

export { pymeBodySchema, pymeIdSchema };
