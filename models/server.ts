import express, { Application } from 'express';
import userRoutes from '../routes/usuario';
import cors from 'cors';
import db from '../db/connection';

export class Server {

    private app: Application;
    private port : string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express(); 
        this.port = process.env.PORT || "3000";

        // Conexion a la base de datos
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Definicion de rutas
        this.routes();
    }

    middlewares() {
        // Configuración del cors
        this.app.use( cors() );
        // Lectura del body
        this.app.use( express.json() );
        // Carpeta publica
        this.app.use( express.static( 'public' ) );
    }
    // TODO conectar a la base de datos
    async dbConnection() {
        try {
            await db.authenticate();
            console.log("La base de datos esta online");
            await db.sync( { force: false } );
            console.log("La base de datos se sincronizó");
        } catch (error: any) {
            throw new Error(error);
        }
    }

    routes() {
        this.app.use( this.apiPaths.usuarios, userRoutes );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
