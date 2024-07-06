"use strict";

import Joi from "joi";
// import CATEGORIAS from "../constants/categorias.constants.js";

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
    nombre: Joi.string().required().messages({
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio.",
        "string.base": "El nombre debe ser de tipo string.",
    }),
    telefono: Joi.string().required().min(9).messages({
        "string.empty": "El telefono no puede estar vacío.",
        "any.required": "El telefono es obligatorio.",
        "string.base": "El telefono debe ser de tipo string.",
        "string.min": "El telefono debe tener al menos 9 caracteres.",
    }),
    comuna: Joi.string().required().messages({
        "string.empty": "La comuna no puede estar vacía.",
        "any.required": "La comuna es obligatoria.",
        "string.base": "La comuna debe ser de tipo string.",
    }),
    direccion: Joi.string().required().messages({
        "string.empty": "La direccion no puede estar vacía.",
        "any.required": "La direccion es obligatoria.",
        "string.base": "La direccion debe ser de tipo string.",
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
