"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const test = (req, res) => {
    let token = res.getHeader('emailToken');
    let rolToken = res.getHeader('rolToken');
    if (rolToken) {
    }
    res.status(200).json({ "Status": "Ok", token, rolToken });
};
exports.test = test;
