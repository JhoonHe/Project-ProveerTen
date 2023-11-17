"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGrocer = void 0;
const db_config_1 = __importDefault(require("../config/db-config"));
const registerGrocer = (data) => {
    const insertGrocerQuery = 'insert into Grocer (email_grocer, name_grocer, last_name_grocer, name_store, city_grocer, password_grocer) VALUES (?,?,?,?,?,?)';
    const insertPhoneQuery = 'insert into GrocerPhone (number_grocer, fk_phone_email_grocer) values (?,?)';
    const insertAddressQuery = 'insert into GrocerAddress (neighborhood, street, number_street, fk_address_email_grocer) VALUES (?,?,?,?)';
    return new Promise((resolve, reject) => {
        db_config_1.default.query(insertGrocerQuery, [data.email_grocer, data.name_grocer, data.last_name_grocer, data.name_store, data.city_grocer, data.password_grocer], (error) => {
            if (error) {
                reject(error);
            }
            else {
                db_config_1.default.query(insertAddressQuery, [data.neighborhood, data.street, data.number_street, data.email_grocer], (error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        db_config_1.default.query(insertPhoneQuery, [data.number_grocer, data.email_grocer], (error) => {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve(true);
                            }
                        });
                    }
                });
            }
        });
    });
};
exports.registerGrocer = registerGrocer;
