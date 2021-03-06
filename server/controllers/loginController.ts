import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import db from '../database'


class LoginController {

    public async login(req: Request, res: Response) {
        await db.query(`SELECT * FROM usuarios WHERE user = ?;`, req.body.user, function (err: any, result: string | any[], fields: any) {
            if (err) throw err
            if (result.length > 0) {
                bcrypt.compare(req.body.pass, result[0].pass, function (err, response) {
                    res.json(response)
                });
            }
            else {
                res.json(false)
            }
        });
    }

    public async setUser(req: Request, res: Response) {

        //ESTE MÉTODO RECIBE UN OBJETO CON DOS PROPIEDADES, UNA ES user y OTRA ES pass
        //CON ESTOS DATOS SE INSERTARÁ UN NUEVO USUARIO EN LA BASE DE DATOS CON UNA CONTRASEÑA ENCRIPTADA

        const resultUsr = await db.query(`SELECT * FROM usuarios WHERE user = ?`, req.body.user)
        if (resultUsr.length > 0) {
            res.json(false)
        }
        else {
            const saltRounds = 13;
            bcrypt.hash(req.body.pass, saltRounds, async function (err, hash) {
                req.body.pass = hash
                await db.query(`INSERT INTO usuarios set ?`, req.body, function (err: any, result: any, fields: any) {
                    if (err) throw err
                    res.json(result)
                });
            });
        }
    }

    public async updateUser(req: Request, res: Response) {

        //ESTE MÉTODO RECIBE UN OBJETO CON DOS PROPIEDADES, UNA LLAMADA user Y OTRA LLAMADA pass
        //LA PROPIEDAD pass ES LA NUEVA CONTRASEÑA DEL USUARIO Y LA PROPIERDAD user ES EL USUARIO AL QUE SE
        //LE VA A CAMBIAR LA CONTRASEÑA

        const saltRounds = 13;
        bcrypt.hash(req.body.pass, saltRounds, async function (err, hash) {
            req.body.pass = hash
            await db.query(`UPDATE usuarios SET pass = ? WHERE user = ?`, [req.body.pass, req.body.user], function (err: any, result: any, fields: any) {
                if (err) throw err
                res.json(result)
            });
        });
    }
}

const loginController = new LoginController()
export default loginController