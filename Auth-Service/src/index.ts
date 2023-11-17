import Server from "./server";
import dotenv from 'dotenv';
import conection from './config/db-config';

// Configuramos dotenv 
dotenv.config();

// Instanciamos el servidor
const server = new Server();

server.listen();

// Conectamos la db
conection;

