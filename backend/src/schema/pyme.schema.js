"use strict";

import Joi from "joi";
const phoneRegex = /^[0-9]{9}$/; // Solo acepta 9 digitos
import TipoServicio from "../constants/categoria.constant.js";
import Comunas from "../constants/comuna.constant.js";  
/**
 * Esquema de validacion para el cuerpo de la solicitud de pyme
 */
const pymeBodySchema = Joi.object({
    idUser: Joi.string()
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
    descripcion: Joi.string().required().min(3).max(250).messages({
        "string.empty": "La descripcion no puede estar vacía.",
        "any.required": "La descripcion es obligatoria.",
        "string.base": "La descripcion debe ser de tipo string.",
        "string.min": "La descripcion debe tener al menos 3 caracteres.",
        "string.max": "La descripcion debe tener como máximo 250 caracteres.",
    }),
    telefono: Joi.string().pattern(phoneRegex).required().messages({
        "string.empty": "El telefono no puede estar vacío.",
        "any.required": "El telefono es obligatorio.",
        "string.base": "El telefono debe ser de tipo string.",
        "string.pattern.base": "El telefono debe tener exactamente 9 digitos.",
    }),
    comuna: Joi.string().valid(...Comunas).required().messages({
        "string.empty": "La comuna no puede estar vacía.",
        "any.required": "La comuna es obligatoria.",
        "string.base": "La comuna debe ser de tipo string.",
        "any.only": "La comuna debe ser una de las comunas válidas.",
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
    categoria: Joi.string()
        .valid(...TipoServicio)
        .required()
        .messages({
            "string.empty": "La categoría no puede estar vacía.",
            "any.required": "La categoría es obligatoria.",
            "string.base": "La categoría debe ser de tipo string.",
            // eslint-disable-next-line max-len
            "any.only": "La categoría debe ser una de las siguientes: " + TipoServicio.join(", ") + ".",
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
