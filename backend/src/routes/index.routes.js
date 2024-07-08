"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de pymes */
import pymeRoutes from "./pyme.routes.js";

/** Enrutador de Horas */

import horaSlotRoutes from "./horaSlot.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

/** Instancia del enrutador */
const router = Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

// Define las rutas para las pymes /api/pymes
router.use("/pymes", pymeRoutes);
router.use("/hora", horaSlotRoutes);

// Exporta el enrutador
export default router;
