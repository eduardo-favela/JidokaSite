import { Router } from 'express'
import adminController from '../controllers/adminController'

class ContactoRoutes {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    config(): void {
        this.router.post('/setSliderImg', adminController.setSliderImg)
        this.router.post('/setCasoExito', adminController.setCasoExito)
        this.router.get('/getSliders', adminController.getSilders)
        this.router.get('/getCasosExito', adminController.getCasosExito)
        this.router.post('/deleteSlider', adminController.deleteSlider)
        this.router.post('/deleteCaso', adminController.deleteCaso)
        this.router.post('/updateSlider', adminController.updateSlider)
        this.router.post('/getCards', adminController.getCards)
        this.router.post('/getCardsTable', adminController.getCardsTable)
        this.router.post('/updateCard', adminController.updateCard)
        this.router.get('/getProductos', adminController.getProductos)
    }
}

const contactoRoutes = new ContactoRoutes()
export default contactoRoutes.router