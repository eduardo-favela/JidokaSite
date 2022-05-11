"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = __importDefault(require("../controllers/adminController"));
class ContactoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/setSliderImg', adminController_1.default.setSliderImg);
        this.router.post('/setCasoExito', adminController_1.default.setCasoExito);
        this.router.get('/getSliders', adminController_1.default.getSilders);
        this.router.get('/getCasosExito', adminController_1.default.getCasosExito);
        this.router.post('/deleteSlider', adminController_1.default.deleteSlider);
        this.router.post('/deleteCaso', adminController_1.default.deleteCaso);
        this.router.post('/updateSlider', adminController_1.default.updateSlider);
        this.router.post('/getCards', adminController_1.default.getCards);
        this.router.post('/getCardsTable', adminController_1.default.getCardsTable);
        this.router.post('/updateCard', adminController_1.default.updateCard);
        this.router.get('/getProductos', adminController_1.default.getProductos);
    }
}
const contactoRoutes = new ContactoRoutes();
exports.default = contactoRoutes.router;
