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
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield Usuario_1.default.findAll();
        res.json({
            msg: 'Error al obtener el usuario',
            ok: false,
            data: usuarios
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al obtener los usuarios',
            ok: false,
            data: null
        });
    }
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield Usuario_1.default.findByPk(id);
        if (!usuario) {
            res.json({
                msg: 'No se encontró el usuario',
                ok: false,
                data: null
            });
        }
        else {
            res.json({
                msg: 'getUsuario',
                ok: true,
                data: usuario
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener el usuario',
            ok: false,
            data: null
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield Usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: 'El email ya existe',
                ok: false,
                data: null
            });
        }
        const usuario = yield Usuario_1.default.create(body);
        res.json({
            msg: 'postUsuarios',
            ok: true,
            data: usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el usuario',
            ok: false,
            data: null
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield Usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(400).json({
                msg: 'No se encontró el usuario',
                ok: false,
                data: null
            });
        }
        else {
            if (body.email) {
                const existeEmail = yield Usuario_1.default.findOne({
                    where: {
                        email: body.email
                    }
                });
                if (existeEmail) {
                    return res.status(400).json({
                        msg: 'El email ya existe',
                        ok: false,
                        data: null
                    });
                }
            }
        }
        const usuarioActualizado = yield usuario.update(body);
        res.json({
            msg: 'Usuario creado con exito',
            ok: true,
            data: usuarioActualizado
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el usuario',
            ok: false,
            data: null
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield Usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(400).json({
                msg: 'No se encontró el usuario',
                ok: false,
                data: null
            });
        }
        // Elminado completamente de la Base de Datos
        // await usuario.destroy();
        yield usuario.update({
            estado: false
        });
        res.json({
            msg: 'Usuario eliminado con exito',
            ok: true,
            data: usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el usuario',
            ok: false,
            data: null
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map