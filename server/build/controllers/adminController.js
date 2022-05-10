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
const fs_1 = __importDefault(require("fs"));
const database_1 = __importDefault(require("../database"));
const path_1 = __importDefault(require("path"));
class AdminController {
    setSliderImg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let base64Data = req.body.img.replace(/^data:image\/jpeg;base64,/, "");
            const date = new Date();
            const imgTitle = 'slider-' + Math.floor(Math.random() * date.getTime());
            const imgPath = `${__dirname}/../../assets/img/carrusel/${imgTitle}.${req.body.imgType}`;
            const buffer = Buffer.from(base64Data, "base64");
            fs_1.default.writeFileSync(imgPath, buffer);
            yield database_1.default.query(`INSERT INTO imagenes SET nombre = ?;`, imgPath, (err, result, fields) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    throw err;
                let resultado = result;
                yield database_1.default.query(`INSERT INTO posts SET titulo = ?, descripcion = ?, imagen_idimagen = ?, tipo = 1, producto = 1;`, [req.body.titulo, req.body.desc, resultado.insertId], function (err, result, fields) {
                    if (err)
                        throw err;
                    res.json(true);
                });
            }));
        });
    }
    getSilders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sliders = yield database_1.default.query(`SELECT idcarruselImg AS id, titulo, descripcion AS 'desc', nombre AS imgPath, idimagen AS imgId
        FROM posts
        INNER JOIN imagenes ON posts.imagen_idimagen = imagenes.idimagen
        WHERE tipo = 1;`);
            sliders.forEach(function (slider) {
                let imagesPath = path_1.default.join(slider.imgPath);
                let bitmap = fs_1.default.readFileSync(imagesPath, 'base64');
                slider.img = bitmap;
            });
            res.json(sliders);
        });
    }
    getCards(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let cards = yield database_1.default.query(`SELECT idcarruselImg, titulo, descripcion AS 'desc', nombre AS imgPath, idimagen AS imgId
        FROM posts
        INNER JOIN imagenes ON posts.imagen_idimagen = imagenes.idimagen
        INNER JOIN productos ON posts.producto = productos.id_producto
        INNER JOIN post_has_tipo_aplicacion ON post_has_tipo_aplicacion.post_hta_idpost = posts.idcarruselImg
        INNER JOIN tiposaplicaciones ON post_has_tipo_aplicacion.post_hta_idtipo = tiposaplicaciones.id_tipos_aplicaciones
        WHERE posts.tipo = 3 AND tiposaplicaciones.id_tipos_aplicaciones = ? AND posts.producto = ?;`, [req.body.tipo, req.body.producto]);
            cards.forEach(function (slider) {
                let imagesPath = path_1.default.join(slider.imgPath);
                let bitmap = fs_1.default.readFileSync(imagesPath, 'base64');
                slider.img = bitmap;
            });
            res.json(cards[0]);
        });
    }
    getCardsTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let cards = yield database_1.default.query(`SELECT idcarruselImg, titulo, descripcion AS 'desc', nombre AS imgPath, idimagen AS imgId,
        tiposaplicaciones.id_tipos_aplicaciones, tiposaplicaciones.tipo
        FROM posts
        INNER JOIN imagenes ON posts.imagen_idimagen = imagenes.idimagen
        INNER JOIN productos ON posts.producto = productos.id_producto
        INNER JOIN post_has_tipo_aplicacion ON post_has_tipo_aplicacion.post_hta_idpost = posts.idcarruselImg
        INNER JOIN tiposaplicaciones ON post_has_tipo_aplicacion.post_hta_idtipo = tiposaplicaciones.id_tipos_aplicaciones
        WHERE posts.tipo = 3 AND posts.producto = ?;`, [req.body.producto]);
            cards.forEach(function (slider) {
                let imagesPath = path_1.default.join(slider.imgPath);
                let bitmap = fs_1.default.readFileSync(imagesPath, 'base64');
                slider.img = bitmap;
            });
            res.json(cards);
        });
    }
    deleteSlider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`DELETE FROM posts WHERE idcarruselImg = ?;`, req.body.idSlider);
            yield database_1.default.query(`DELETE FROM imagenes WHERE idimagen = ?;`, req.body.imgId);
            fs_1.default.rm(path_1.default.join(req.body.imgPath), function (err) {
                if (err)
                    throw err;
                else {
                    res.json(true);
                }
            });
        });
    }
    updateSlider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`UPDATE posts SET titulo = ?, descripcion = ? WHERE idcarruselImg = ?;`, [req.body.titulo, req.body.desc, req.body.id], (err, result, fields) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    throw err;
                res.json(true);
            }));
        });
    }
    updateCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.changeImg) {
                let imgAntPath = yield database_1.default.query(`SELECT * FROM imagenes WHERE idimagen = ?;`, [req.body.imgIdAnt]);
                fs_1.default.unlinkSync(path_1.default.join(imgAntPath[0].nombre));
                let base64Data = req.body.img.replace(/^data:image\/jpeg;base64,/, "");
                const imgTitle = 'img-' + req.body.tipo;
                const imgPath = `${__dirname}/../../assets/img/cards/${imgTitle}.${req.body.imgType}`;
                const buffer = Buffer.from(base64Data, "base64");
                fs_1.default.writeFileSync(imgPath, buffer);
                yield database_1.default.query(`UPDATE posts SET titulo = ?, descripcion = ? WHERE idcarruselImg = ?;`, [req.body.titulo, req.body.desc, req.body.idCard], (err, result, fields) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    res.json(true);
                }));
            }
            else {
                yield database_1.default.query(`UPDATE posts SET titulo = ?, descripcion = ? WHERE idcarruselImg = ?;`, [req.body.titulo, req.body.desc, req.body.idCard], (err, result, fields) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    res.json(true);
                }));
            }
        });
    }
}
const adminController = new AdminController();
exports.default = adminController;
