"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (username, rol) => {
    const SECRET_KEY = process.env.SECRET_KEY;
    // Generar token
    const token = jsonwebtoken_1.default.sign({
        username: username
    }, SECRET_KEY);
    return token;
};
exports.default = generateToken;
