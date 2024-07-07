"use strict";

import { Router } from "express";
import pymeController from "../controllers/pyme.controller.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = Router();

router.use(authenticationMiddleware);

router.get("/", pymeController.getPymes);
router.post("/", isAdmin, pymeController.createPyme); // agregar mas roles
router.get("/:id", pymeController.getPymeById);
router.get("/nombre/:nombre", pymeController.getPymesByName); // modificar
router.get("/comuna/:comuna", pymeController.getPymesByComuna); // revisar o eliminar
router.put("/:id", isAdmin, pymeController.updatePyme); // agregar mas roles
router.delete("/:id", isAdmin, pymeController.deletePyme); // agregar mas roles

export default router;