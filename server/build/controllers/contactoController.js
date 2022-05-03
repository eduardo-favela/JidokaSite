"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class ContactoController {
    sendMail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = 'https://www.google.com/recaptcha/api/siteverify';
            let data = {
                secret: '6LcU77AfAAAAAAeBoju4hmeS8a_G8Zt2u8m11tQx',
                response: req.body.token
            };
            axios_1.default.post(url + `?secret=${data.secret}&response=${data.response}`).then((response) => __awaiter(this, void 0, void 0, function* () {
                if (response.data.success) {
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer_1.default.createTransport({
                        host: "mail.alfagamma.com.mx",
                        port: 3535,
                        secure: false,
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
                    };
                    // send mail with defined transport object
                    yield transporter.sendMail(mailDetails, function (err, data) {
                        if (err) {
                            console.log('Error Occurs', err);
                            res.json(false);
                        }
                        else {
                            console.log('Email sent successfully from ', mailDetails.to);
                            res.json(true);
                        }
                    });
                }
                else {
                    res.json(false);
                }
            }));
        });
    }
}
const contactoController = new ContactoController();
exports.default = contactoController;
