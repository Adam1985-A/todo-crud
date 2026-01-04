import express from "express";
import { AuthController } from "../controller/auth.controller.js";

const routes = express.Router();
const controller = new AuthController();

routes.post('/register', controller.register);
routes.post('/login', controller.login);

export default routes;