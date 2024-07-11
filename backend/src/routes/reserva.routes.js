"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express"; 
 
/** Middlewares de autorización */
import { isAdmin } from "../middlewares/authorization.middleware.js"; 

import reservaController from "../controllers/reserva.controller.js"; 


const router = Router();     


router.get("/", isAdmin, reservaController.getReservas); 
router.post("/", isAdmin, reservaController.createReserva); 
router.get("/:id", isAdmin, reservaController.getReservaById);
router.put("/:id", isAdmin, reservaController.updateReserva);
router.delete("/:id", isAdmin, reservaController.cancelReserva);


export default router; 


// AGREGAR FUNCIONES XD
