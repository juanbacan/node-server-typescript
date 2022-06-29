import { Request, Response } from 'express';
import Usuario from '../models/Usuario';

export const getUsuarios = async(req: Request, res: Response) => {

    try {
        const usuarios = await Usuario.findAll();

        res.json({
            msg: 'Error al obtener el usuario',
            ok: false,
            data: usuarios
        })
    } catch (error) {
        
        res.status(500).json({
            message: 'Error al obtener los usuarios',
            ok: false,
            data: null
        });

    }
}

export const getUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            res.json({
                msg: 'No se encontró el usuario',
                ok: false,
                data: null
            })
        }else{
            res.json({
                msg: 'getUsuario',
                ok: true,
                data: usuario
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener el usuario',
            ok: false,
            data: null
        });
    }
}

export const postUsuario = async (req: Request, res: Response) => {

    const { body } = req;

    try {
        const existeEmail = await Usuario.findOne({
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

        const usuario = await Usuario.create(body);

        res.json({
            msg: 'postUsuarios',
            ok: true,
            data: usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el usuario',
            ok: false,
            data: null
        });      
    }
}

export const putUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(400).json({
                msg: 'No se encontró el usuario',
                ok: false,
                data: null
            });
        } else{
            if(body.email){
                const existeEmail = await Usuario.findOne({
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
 
        const usuarioActualizado = await usuario.update(body);

        res.json({
            msg: 'Usuario creado con exito',
            ok: true,
            data: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el usuario',
            ok: false,
            data: null
        });      
    }
}

export const deleteUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(400).json({
                msg: 'No se encontró el usuario',
                ok: false,
                data: null
            });
        }

        // Elminado completamente de la Base de Datos
        // await usuario.destroy();
        await usuario.update({
            estado: false
        });

        res.json({
            msg: 'Usuario eliminado con exito',
            ok: true,
            data: usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el usuario',
            ok: false,
            data: null
        });      
    }
}

