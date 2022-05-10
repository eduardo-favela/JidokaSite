import { Router } from 'express'
import adminController from '../controllers/adminController'

class ContactoRoutes {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    config(): void {
        this.router.post('/setSliderImg', adminController.setSliderImg)
        this.router.get('/getSliders', adminController.getSilders)
        this.router.post('/deleteSlider', adminController.deleteSlider)
        this.router.post('/updateSlider', adminController.updateSlider)
        this.router.post('/getCards', adminController.getCards)
        this.router.post('/getCardsTable', adminController.getCardsTable)
        this.router.post('/updateCard', adminController.updateCard)
    }
}

const contactoRoutes = new ContactoRoutes()
export default contactoRoutes.router