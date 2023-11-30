"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authToken = (req, res, next) => {
    try {
        const tokenAuth = req.header('Authorization');
        if (!tokenAuth) {
            return res.status(401).json({ auth: false, message: 'Token no proporcionado' });
        }
        let token = tokenAuth.split(' ')[1];
        let secretKey = process.env.SECRET_KEY;
        jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.log("error", err);
                return res.status(401).json({ auth: false, message: 'Error al autenticar el token' });
            }
            if (decoded) {
                // El token es válido, puedes acceder a las propiedades del token
                const { email, role } = decoded;
                res.setHeader('emailToken', email);
                res.setHeader('rolToken', role);
                next();
            }
            else {
                return res.status(401).json({ auth: false, message: 'Token inválido' });
            }
        });
    }
    catch (error) {
        console.log("ERROR: " + error);
    }
};
exports.default = authToken;
