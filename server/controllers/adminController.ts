import { Request, Response } from 'express'
import fs from 'fs'
import db from '../database'
import path from 'path'


class AdminController {

    public async setSliderImg(req: Request, res: Response) {
        let base64Data = req.body.img.replace(/^data:image\/jpeg;base64,/, "");
        const date = new Date()
        const imgTitle = `slider-${Math.floor(Math.random() * date.getTime())}.${req.body.imgType}`;
        const imgPath = `${__dirname}/../../assets/img/carrusel/${imgTitle}`
        const buffer = Buffer.from(base64Data, "base64");
        fs.writeFileSync(imgPath, buffer);
        await db.query(`INSERT INTO imagenes SET nombre = ?;`, imgTitle, async (err: any, result: string | any[], fields: any) => {
            if (err) throw err
            let resultado: any = result;
            await db.query(`INSERT INTO posts SET titulo = ?, descripcion = ?, imagen_idimagen = ?, tipo = 1, producto = ?;`,
                [req.body.titulo, req.body.desc, resultado.insertId, req.body.producto],
                function (err: any, result: string | any[], fields: any) {
                    if (err) throw err
                    res.json(true)
                })
        })
    }

    public async setCasoExito(req: Request, res: Response) {
        let base64Data = req.body.img.replace(/^data:image\/jpeg;base64,/, "");
        const date = new Date()
        const imgTitle = `casoExito-${Math.floor(Math.random() * date.getTime())}.${req.body.imgType}`;
        const imgPath = `${__dirname}/../../assets/img/casos-de-exito/${imgTitle}`
        const buffer = Buffer.from(base64Data, "base64");
        fs.writeFileSync(imgPath, buffer);
        await db.query(`INSERT INTO imagenes SET nombre = ?;`, imgTitle, async (err: any, result: string | any[], fields: any) => {
            if (err) throw err
            let resultado: any = result;
            await db.query(`INSERT INTO posts SET titulo = ?, descripcion = ?, imagen_idimagen = ?, tipo = 2, producto = 3;`,
                [req.body.titulo, req.body.desc, resultado.insertId],
                function (err: any, result: string | any[], fields: any) {
                    if (err) throw err
                    res.json(true)
                })
        })
    }

    public async getSilders(req: Request, res: Response) {
        let sliders = await db.query(`SELECT idcarruselImg AS id, titulo, descripcion AS 'desc', nombre AS imgPath, idimagen AS imgId
        FROM posts
        INNER JOIN imagenes ON posts.imagen_idimagen = imagenes.idimagen
        WHERE tipo = 1;`);

        sliders.forEach(function (slider: any) {
            let imagesPath = path.join(`${__dirname}/../../assets/img/carrusel/${slider.imgPath}`)
            let bitmap = fs.readFileSync(imagesPath, 'base64');
            slider.img = bitmap
        });

        res.json(sliders);
    }

    public async getCasosExito(req: Request, res: Response) {
        let casosExito = await db.query(`SELECT idcarruselImg AS id, titulo, descripcion AS 'desc', nombre AS imgPath, idimagen AS imgId
        FROM posts
        INNER JOIN imagenes ON posts.imagen_idimagen = imagenes.idimagen
        WHERE tipo = 2;`);

        casosExito.forEach(function (slider: any) {
            let imagesPath = path.join(`${__dirname}/../../assets/img/casos-de-exito/${slider.imgPath}`)
            let bitmap = fs.readFileSync(imagesPath, 'base64');
            slider.img = bitmap
        });

        res.json(casosExito);
    }

    public async getCards(req: Request, res: Response) {
        let cards = await db.query(`SELECT idcarruselImg, titulo, descripcion AS 'desc', nombre AS imgPath, idimagen AS imgId
        FROM posts
        INNER JOIN imagenes ON posts.imagen_idimagen = imagenes.idimagen
        INNER JOIN productos ON posts.producto = productos.id_producto
        INNER JOIN post_has_tipo_aplicacion ON post_has_tipo_aplicacion.post_hta_idpost = posts.idcarruselImg
        INNER JOIN tiposaplicaciones ON post_has_tipo_aplicacion.post_hta_idtipo = tiposaplicaciones.id_tipos_aplicaciones
        WHERE posts.tipo = 3 AND tiposaplicaciones.id_tipos_aplicaciones = ? AND posts.producto = ?;`, [req.body.tipo, req.body.producto]);

        cards.forEach(function (slider: any) {
            let imagesPath = path.join(`${__dirname}/../../assets/img/cards/${slider.imgPath}`)
            let bitmap = fs.readFileSync(imagesPath, 'base64');
            slider.img = bitmap
        });

        res.json(cards[0]);
    }

    public async getCardsTable(req: Request, res: Response) {
        let cards = await db.query(`SELECT idcarruselImg, titulo, descripcion AS 'desc', nombre AS imgPath, idimagen AS imgId,
        tiposaplicaciones.id_tipos_aplicaciones, tiposaplicaciones.tipo
        FROM posts
        INNER JOIN imagenes ON posts.imagen_idimagen = imagenes.idimagen
        INNER JOIN productos ON posts.producto = productos.id_producto
        INNER JOIN post_has_tipo_aplicacion ON post_has_tipo_aplicacion.post_hta_idpost = posts.idcarruselImg
        INNER JOIN tiposaplicaciones ON post_has_tipo_aplicacion.post_hta_idtipo = tiposaplicaciones.id_tipos_aplicaciones
        WHERE posts.tipo = 3 AND posts.producto = ?;`, [req.body.producto]);

        cards.forEach(function (slider: any) {
            let imagesPath = path.join(`${__dirname}/../../assets/img/cards/${slider.imgPath}`)
            let bitmap = fs.readFileSync(imagesPath, 'base64');
            slider.img = bitmap
        });

        res.json(cards);
    }

    public async deleteSlider(req: Request, res: Response) {
        await db.query(`DELETE FROM posts WHERE idcarruselImg = ?;`, req.body.idSlider)
        await db.query(`DELETE FROM imagenes WHERE idimagen = ?;`, req.body.imgId)
        fs.rm(path.join(`${__dirname}/../../assets/img/carrusel/${req.body.imgPath}`), function (err) {
            if (err) throw err;
            else { res.json(true) }
        })
    }

    public async deleteCaso(req: Request, res: Response) {
        await db.query(`DELETE FROM posts WHERE idcarruselImg = ?;`, req.body.idCaso)
        await db.query(`DELETE FROM imagenes WHERE idimagen = ?;`, req.body.imgId)
        fs.rm(path.join(`${__dirname}/../../assets/img/casos-de-exito/${req.body.imgPath}`), function (err) {
            if (err) throw err;
            else { res.json(true) }
        })
    }

    public async updateSlider(req: Request, res: Response) {
        await db.query(`UPDATE posts SET titulo = ?, descripcion = ? WHERE idcarruselImg = ?;`,
            [req.body.titulo, req.body.desc, req.body.id], async (err: any, result: string | any[], fields: any) => {
                if (err) throw err
                res.json(true);
            })
    }

    public async updateCard(req: Request, res: Response) {

        if (req.body.changeImg) {

            let imgAntPath = await db.query(`SELECT * FROM imagenes WHERE idimagen = ?;`, [req.body.imgIdAnt])
            fs.unlinkSync(path.join(`${__dirname}/../../assets/img/cards/${imgAntPath[0].nombre}`))

            let base64Data = req.body.img.replace(/^data:image\/jpeg;base64,/, "");
            const imgTitle = `img-${req.body.tipo}.${req.body.imgType}`;
            const imgPath = `${__dirname}/../../assets/img/cards/${imgTitle}`
            const buffer = Buffer.from(base64Data, "base64");
            fs.writeFileSync(imgPath, buffer);
            await db.query(`UPDATE posts SET titulo = ?, descripcion = ? WHERE idcarruselImg = ?;`,
                [req.body.titulo, req.body.desc, req.body.idCard], async (err: any, result: string | any[], fields: any) => {
                    if (err) throw err;
                    res.json(true)
                })
        }
        else {
            await db.query(`UPDATE posts SET titulo = ?, descripcion = ? WHERE idcarruselImg = ?;`,
                [req.body.titulo, req.body.desc, req.body.idCard], async (err: any, result: string | any[], fields: any) => {
                    if (err) throw err
                    res.json(true);
                })
        }
    }

    public async getProductos(req: Request, res: Response) {
        let productos = await db.query(`SELECT id_producto AS id, producto FROM productos ORDER BY producto;`);
        res.json(productos)
    }

    public async getAutomText(req: Request, res: Response) {
        let automText = await db.query(`SELECT * FROM textos WHERE seccion_pagina = ?;`,req.body.seccion);
        res.json(automText)
    }

    public async setAutomText(req: Request, res: Response) {
        await db.query(`UPDATE textos SET contenido = ? WHERE idtexto = ?;`,[req.body.contenido, req.body.idtexto], async (err: any, result: string | any[], fields: any) => {
            if (err) throw err
            res.json(true)
        });
    }
}

const adminController = new AdminController()
export default adminController