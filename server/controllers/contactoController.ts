import { Request, Response } from 'express'
import axios from 'axios';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt'
import db from '../database'


class ContactoController {

    public async sendMail(req: Request, res: Response) {
        let url = 'https://www.google.com/recaptcha/api/siteverify';
        let data = {
            secret: '6LcU77AfAAAAAAeBoju4hmeS8a_G8Zt2u8m11tQx',
            response: req.body.token
        };
        axios.post(url + `?secret=${data.secret}&response=${data.response}`).then(async response => {
            if (response.data.success) {
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: "mail.alfagamma.com.mx",
                    port: 3535,
                    secure: false, // use TLS
                    auth: {
                        user: "coord.softweb@alfagamma.com.mx",
                        pass: "USCedu0902#",
                    },
                    tls: {
                        // do not fail on invalid certs
                        rejectUnauthorized: false,
                    },
                });

                let mailDetails = {
                    from: 'coord.softweb@alfagamma.com.mx',
                    to: ['eduardo-favela@outlook.com'],
                    subject: 'Formulario desde página web',
                    html: `
                    <head>
                        <style>
                        table, td, div, h1, p {font-family: "Montserrat", sans-serif;}
                        </style>
                    </head>
                    <body style="margin:0;padding:0;">
                        <table role="presentation"
                        style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
                        <tr>
                            <td align="center" style="padding:0;">
                            <table role="presentation"
                                style="width:500px;border-collapse:collapse;border:1px solid
                                #cccccc;border-spacing:0;text-align:left;">
                                <tr>
                                <td style="padding:36px 30px 42px 30px;">
                                    <table role="presentation"
                                    style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                                    <tr>
                                        <td style="color:#153643;">
                                        <h1
                                            style="text-align:center;font-size:24px;font-weight:bolder;">Formulario desde página web</h1>
                                        <hr>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0;">
                                        <table role="presentation">
                                            <tr>
                                            <th style="text-align: initial; width: 260px;padding:
                                                5px;border-right-color: black;
                                                border-right-width: thin;">
                                                Nombre
                                            </th>
                                            <td style="padding: 5px;">
                                                ${req.body.mail.nombre}
                                            </td>
                                            </tr>
                                            <tr>
                                            <th style="text-align: initial; width: 260px;padding:
                                                5px;
                                                color:#153643; border-right-width: thin;">
                                                Teléfono
                                            </th>
                                            <td style="padding: 5px;">
                                                ${req.body.mail.telefono}
                                            </td>
                                            </tr>
                                            <tr>
                                            <th style="text-align: initial; width: 260px;padding:
                                                5px;
                                                color:#153643; border-right-width: thin;">
                                                Correo
                                            </th>
                                            <td style="padding: 5px;">
                                                ${req.body.mail.correo}
                                            </td>
                                            </tr>
                                            <tr>
                                            <th style="text-align: initial; width: 260px;padding:
                                                5px;color:#153643;
                                                border-right-width: thin;">
                                                Mensaje
                                            </th>
                                            <td style="padding: 5px;">
                                                ${req.body.mail.mensaje}
                                            </td>
                                            </tr>
                                        </table>
                                        </td>
                                    </tr>
                                    </table>
                                </td>
                                </tr>
                                <tr>
                                <td style="padding: 15px;border-bottom: solid;border-bottom-color:
                                    #44b84c;border-top: solid;border-top-color: #44b84c;text-align:
                                    center; border-top-width: 3px;border-bottom-width: 3px;">
                                    <table role="presentation"
                                    style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                                    <tbody><tr>
                                        <td style="padding:0;width:50%;text-align: center;"
                                            align="left">
                                            <p
                                            style="margin:0;font-size:14px;line-height:16px;font-family:'Montserrat',sans-serif;">
                                            JIDOKA Automatización y Energía, 2022
                                            </p>
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </td>
                                </tr>
                            </table>
                            </td>
                        </tr>
                        </table>
                    </body>`
                }

                // send mail with defined transport object
                await transporter.sendMail(mailDetails, function (err, data) {
                    if (err) {
                        console.log('Error Occurs', err);
                        res.json(false)
                    } else {
                        console.log('Email sent successfully from ', mailDetails.to);
                        res.json(true)
                    }
                });
            }
            else {
                res.json(false)
            }
        })
    }
}

const contactoController = new ContactoController()
export default contactoController