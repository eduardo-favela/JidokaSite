"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactoController_1 = __importDefault(require("../controllers/contactoController"));
class ContactoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/sendMail', contactoController_1.default.sendMail);
    }
}
const contactoRoutes = new ContactoRoutes();
exports.default = contactoRoutes.router;
