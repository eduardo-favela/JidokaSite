import { Router } from 'express'
import contactoController  from '../controllers/contactoController'

class ContactoRoutes {
    public router: Router = Router()

    constructor(){
        this.config()
    }

    config(): void{
        this.router.post('/sendMail', contactoController.sendMail)
    }
}

const contactoRoutes = new ContactoRoutes()
export default contactoRoutes.router